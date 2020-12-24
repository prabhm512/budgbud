$(document).ready(() => {

    // Automatically fill in store hours after open time is entered
    $(".open-time").change(() => {

        const openTime = $(".open-time").val();

        for (let i=0; i<12; i++) {
            $("#hour-"+i).html("");

            const autoTime = parseInt(openTime)+i+1;
            if (autoTime<=12) {
                $("#hour-"+i).html(autoTime);
            } else {
                $("#hour-"+i).html(autoTime-12);
            }
        }
    })

    // Dynamically generate/delete rows for "Stats per Employee table"
    $(".fa-plus").click(() => {
    // <th scope="row">X</th>
        const newTableRow = `
        <tr>
            <td><input type="number" step="0.5" value="3" class="work-hours"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`;
            
        $(".emp-stats > tbody").append(newTableRow);
    });

    $(".fa-minus").click(() => {
        
        const indexLastRow = $(".emp-stats > tbody").children().length - 1;

        // Cannot delete 1st row as it is always required
        if (indexLastRow === 0) {
            return;
        }

        $(".emp-stats > tbody").children()[indexLastRow].remove();

    })

    // Automatically calcualate employee sales targets
    $(".calc-btn").click(() => {
        let totalHours=0;

        const totalEmpStatsRows = $(".emp-stats > tbody").children().length;

        // Calculate total hours
        for (let i=1; i<totalEmpStatsRows; i++) {
            totalHours+=$(".emp-stats > tbody").children()[i].children[0].children[0].valueAsNumber;
        }

        $(".total-hours-num").html(totalHours);

        const dayBudgetVal = parseInt($(".day-budget").val());
        const requiredSalePerHour = dayBudgetVal/totalHours;

        // Calculate sales target for each employee
        for (let i=1; i<totalEmpStatsRows; i++) {
            $(".emp-stats > tbody").children()[i].children[2].innerHTML = "";
            const salesTarget = $(".emp-stats > tbody").children()[i].children[0].children[0].valueAsNumber * requiredSalePerHour;
            const roundedSalesTarget = Math.ceil(salesTarget);

            $(".emp-stats > tbody").children()[i].children[1].append(roundedSalesTarget);
        }
        $(".store-stats > tbody").children()[1].children[1].innerHTML = "";
        const stretchVal = Math.round(dayBudgetVal + (($(".stretch-percent").val()/100) * dayBudgetVal));
        $(".store-stats > tbody").children()[1].children[1].append(stretchVal);

        // Calculate sales target & connections neeeded per hour
        
        // Clear all existing values in sales target row before adding new values
        for (let i=1; i<=12; i++) {
            $(".operating-hours > tbody").children()[0].children[i].innerHTML = "";
            $("#con-target-"+i).html("");
        }
        const workingHours = $(".working-hours").val();
    
        const salesTarget = stretchVal / workingHours;

        for (let i=1; i<=workingHours; i++) {
            const hourlySalesTarget = Math.ceil(salesTarget * i);

            $(".operating-hours > tbody").children()[0].children[i].innerHTML = hourlySalesTarget;
    
            const conTarget = Math.floor(hourlySalesTarget / $(".budget-atv").val());
            $("#con-target-"+i).html(conTarget);
        }

        // Calculate total connections required in the day 

        // Connections required to meet budget
        const budgetCon = Math.round($(".day-budget").val() / $(".budget-atv").val());
        $(".store-stats > tbody").children()[0].children[4].innerHTML = `x ` + budgetCon;

        // Connections required to meet stretch
        const stretchCon = Math.round($(".stretch-budget").html() / $(".stretch-atv").val());
        $(".store-stats > tbody").children()[1].children[4].innerHTML = `x ` + stretchCon;
    })

    // Calculate actual connections and mark if they are greater than target or not
    $(".sales-actual").change(event => {
        const actualSale = event.target.valueAsNumber;
        const idx = event.target.id.substr(-1);
        const conActual = Math.floor(actualSale / $(".budget-atv").val());

        $("#con-actual-"+idx).html(conActual);

        const targetValue = parseInt($("#con-target-"+idx).html());
        // Add green mark if actual hourly connections equal or are above target
        if (conActual >= targetValue) {
            $("#con-actual-"+idx).css("background-color", "green");
            $("#con-actual-"+idx).css("color", "white");
            $("#con-actual-"+idx).css("padding-left", "5px");
            $("#con-actual-"+idx).css("padding-right", "5px");
        } else {
            $("#con-actual-"+idx).css("background-color", "white");
            $("#con-actual-"+idx).css("color", "black");
        }
    })

    // Connection numbers will change if work hours are changed
    // Need to update css in this case too
    
    // $(".working-hours").change(() => {
    //     for (let i=1; i<=12; i++) {
    //         const targetVal = parseInt($("#con-target-"+i).html());
    //         const actualVal = parseInt($("#con-actual-"+i).html());
    //         // Add green mark if actual hourly connections equal or are above target
    //         if (actualVal >= targetVal) {
    //             $("#con-actual-"+i).css("background-color", "green");
    //             $("#con-actual-"+i).css("color", "white");
    //             $("#con-actual-"+i).css("padding-left", "5px");
    //             $("#con-actual-"+i).css("padding-right", "5px");
    //         } else {
    //             $("#con-actual-"+i).css("background-color", "white");
    //             $("#con-actual-"+i).css("color", "black");
    //         }
    //     }
    // })
})