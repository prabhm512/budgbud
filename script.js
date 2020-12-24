$(document).ready(() => {

    // Automatically fill in store hours after open time is entered
    $(".open-time").change(() => {

        const openTime = $(".open-time").val();

        for (let i=0; i<13; i++) {
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
        const newTableRow = `
        <tr>
            <th scope="row">X</th>
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
            totalHours+=$(".emp-stats > tbody").children()[i].children[1].children[0].valueAsNumber;
        }

        $(".total-hours-num").html(totalHours);

        const dayBudgetVal = parseInt($(".day-budget").val());
        const requiredSalePerHour = dayBudgetVal/totalHours;

        // Calculate sales target for each employee
        for (let i=1; i<totalEmpStatsRows; i++) {
            $(".emp-stats > tbody").children()[i].children[2].innerHTML = "";
            const salesTarget = $(".emp-stats > tbody").children()[i].children[1].children[0].valueAsNumber * requiredSalePerHour;
            const roundedSalesTarget = Math.ceil(salesTarget);

            $(".emp-stats > tbody").children()[i].children[2].append(roundedSalesTarget);
        }
        $(".store-stats > tbody").children()[1].children[1].innerHTML = "";
        const stretchVal = dayBudgetVal + (($(".stretch-percent").val()/100) * dayBudgetVal);
        $(".store-stats > tbody").children()[1].children[1].append(stretchVal);
    })
})