$(document).ready(() => {

    let dailyFigures = [];

    function init() {
        // Get stored dail figures from localStorage
        // Parsing the JSON string to an object
        let storedDailyFigures = JSON.parse(localStorage.getItem("dailyFigures"));

        if (storedDailyFigures !== null) {
            dailyFigures = storedDailyFigures;
            renderDailyFigures();
        }

        // Clear the numbers on screen at 4am every day
        if (dayjs().get('hour') === 4) {
            localStorage.clear();
        }
        
    }
    init();

    // Reload loaction so that it screen clears around 4:30am
    setTimeout(() => location.reload(), 1800000);

    function renderDailyFigures() {
        // Day budget
        $(".day-budget").val(dailyFigures[1].dayBudget);

        // Stretch ATV 
        $(".stretch-atv").val(dailyFigures[1].stretchATV)

        // Stretch Percent 
        $(".stretch-percent").val(dailyFigures[1].stretchPercent);

        // Total hours employees are working in the day
        $(".total-hours-num").html(dailyFigures[1].totalHours);

        // Store hours store is open
        for (let i=0; i<dailyFigures[8].length; i++) {
            $("#hour-"+i).html(dailyFigures[8][i].hour);
            console.log($("#hour-"+i).html(dailyFigures[8][i].hour));
        }

        // Store open time
        $(".store-open").val(dailyFigures[1].storeOpen);
        // Store close time
        $(".store-close").val(dailyFigures[1].storeClose);

        // Average ATV based on employee target ATV's for the day
        $(".budget-atv").val(dailyFigures[1].averageATV);

        // Stretch Value
        if (dailyFigures[1].dayBudget !== null) {
            $(".store-stats > tbody").children()[1].children[1].append(dailyFigures[1].stretchVal);
        }

        // Hourly sales target & connections
        for ( let i=0; i<dailyFigures[1].workingHours; i++) {
            $(".operating-hours > tbody").children()[0].children[i+1].innerHTML = dailyFigures[2][i].hourlySalesTarget;
            $("#con-target-"+(i+1)).html(dailyFigures[2][i].hourlyConnections);
        }

        $(".working-hours").val(dailyFigures[1].workingHours);

        // Clear everything in emp-stats table body except first row before appending items to it
        for (let i=1; i<$(".emp-stats > tbody").children().length; i++) {
            $(".emp-stats > tbody").children()[i].remove();
        }

        // Hours worked & sales target of each employee
        for (let i=0; i<dailyFigures[0].length; i++) {

            const newTableRow = `
                <tr>
                    <td><input type="number" step="0.5" value="${dailyFigures[0][i].hours}" class="work-hours"></td>
                    <td>${dailyFigures[0][i].roundedSalesTarget}</td>
                    <td><input type="number" step="1" class="emp-actual-sales" value="0"></td>
                    <td><input type="number" step="1" class="emp-target-atv" value="0"></td>
                    <td><input type="number" step="1" class="emp-actual-atv" value="0"></td>
                    <td><input type="number" step="0.01" class="emp-target-upt" value="0"></td>
                    <td><input type="number" step="0.01" class="emp-actual-upt" value="0"></td>
                </tr>`;
                
            $(".emp-stats > tbody").append(newTableRow);
        }

        // Connections required in the day (budget & stretch)
        if (dailyFigures[1].finalATV !== null) {
            $(".store-stats > tbody").children()[0].children[4].innerHTML = `x ${dailyFigures[1].budgetCon}`;
            // Final ATV
            $(".final-atv").html(dailyFigures[1].finalATV);
        }

        if (dailyFigures[1].stretchATV !== null) {
            $(".store-stats > tbody").children()[1].children[4].innerHTML = `x ${dailyFigures[1].stretchCon}`;
        }

        // Target& Actual Emp Sales, ATV's & UPT's
        for (let i=0; i<dailyFigures[5].length; i++) {

            // Target ATV 
            $(".emp-stats > tbody").children()[i+1].children[3].children[0].value = dailyFigures[6][i];
            // Target UPT
            $(".emp-stats > tbody").children()[i+1].children[5].children[0].value = dailyFigures[7][i];
            // Actual Sales
            $(".emp-stats > tbody").children()[i+1].children[2].children[0].value = dailyFigures[5][i];
            // Actual ATV's
            $(".emp-stats > tbody").children()[i+1].children[4].children[0].value = dailyFigures[3][i];
            // Actual UPT's
            $(".emp-stats > tbody").children()[i+1].children[6].children[0].value = dailyFigures[4][i];
        }

        if (isNaN(dailyFigures[1].finalUPT) === false) {
            // Final UPT
            $(".final-upt").html(dailyFigures[1].finalUPT);
        }

        // Final Sales
        $(".final-sales").html(dailyFigures[1].finalSales);

        if (dailyFigures[1].finalCons !== null) {
            // Final Connections
            $(".final-connections").html(`x ${dailyFigures[1].finalCons}`);
        }
    }

    // function openTimeChange() {
    //     const openTime = $(".open-time").html();
    //     const openingHours = [];

    //     for (let i=0; i<=13; i++) {
    //         $("#hour-"+i).html("");

    //         const autoTime = parseInt(openTime)+i+1;
    //         if (autoTime<=12) {
    //             $("#hour-"+i).html(autoTime);
    //         } else {
    //             $("#hour-"+i).html(autoTime-12);
    //         }
    //         openingHours.push(
    //             {
    //                 hour: $("#hour-"+i).html()
    //             }
    //         )
    //     }
    //     dailyFigures.push([...openingHours]);
    //     storeDailyFigures();
    // }

    // Dynamically generate/delete rows for "Stats per Employee table"
    $(".fa-plus").click(() => {
    // <th scope="row">X</th>
        const newTableRow = `
            <tr>
                <td><input type="number" step="0.5" value="3" class="work-hours"></td>
                <td></td>
                <td><input type="number" step="1" class="emp-actual-sales" value="0"></td>
                <td><input type="number" step="1" class="emp-target-atv" value="0"></td>
                <td><input type="number" step="1" class="emp-actual-atv" value="0"></td>
                <td><input type="number" step="0.01" class="emp-target-upt" value="0"></td>
                <td><input type="number" step="0.01" class="emp-actual-upt" value="0"></td>
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

        // Clear daily figures array when this button is clicked
        for (let i=0; i<dailyFigures.length; i++) {
            dailyFigures.splice(i);
        }

        // Automatically fill each hour store is open into operating-hours
        const openTime = $(".store-open").val();
        const openingHours = [];;

        for (let i=0; i<=12; i++) {
            $("#hour-"+i).html("");

            const autoTime = parseInt(openTime)+i+1;
            if (autoTime<=12) {
                $("#hour-"+i).html(autoTime);
            } else {
                $("#hour-"+i).html(autoTime-12);
            }
            openingHours.push(
                {
                    hour: $("#hour-"+i).html()
                }
            )
        };

        let totalHours=0;

        const totalEmpStatsRows = $(".emp-stats > tbody").children().length;

        // Calculate total hours
        for (let i=1; i<totalEmpStatsRows; i++) {
            totalHours+=$(".emp-stats > tbody").children()[i].children[0].children[0].valueAsNumber;
        }

        // $(".total-hours-num").html(totalHours);

        const dayBudgetVal = parseInt($(".day-budget").val());

        // Calculate average atv required to meet budget from emp individual atv's
        let totalATV=0;
        // Count number of rows that don't have a target ATV
        let cntRowATV = 0;

        const storeTargetATV = []
        
        for (let i=1; i<totalEmpStatsRows; i++) {
            const empTargetATV = $(".emp-stats > tbody").children()[i].children[3].children[0].valueAsNumber;
            if (empTargetATV === 0 || isNaN(empTargetATV)) {
                cntRowATV+=1;
                continue;
            }
            totalATV+=empTargetATV;

            storeTargetATV.push(empTargetATV);
        }
        
        const averageATV = Math.ceil(totalATV/(totalEmpStatsRows-(1+cntRowATV)));
        // $(".budget-atv").val(averageATV);

        const requiredSalePerHour = dayBudgetVal/totalHours;
        // Created so dailyFigures array only has one sub-array in it.
        const empSalesTargets = [];

        // Calculate sales target for each employee
        for (let i=1; i<totalEmpStatsRows; i++) {
            $(".emp-stats > tbody").children()[i].children[1].innerHTML = "";
            const salesTarget = $(".emp-stats > tbody").children()[i].children[0].children[0].valueAsNumber * requiredSalePerHour;
            const roundedSalesTarget = Math.ceil(salesTarget);

            // $(".emp-stats > tbody").children()[i].children[1].append(roundedSalesTarget);

            empSalesTargets.push(
                {
                    hours: $(".emp-stats > tbody").children()[i].children[0].children[0].valueAsNumber,
                    roundedSalesTarget: roundedSalesTarget
                }
            );
        }
        dailyFigures.push([...empSalesTargets]);

        // Calculate the stretch value
        $(".store-stats > tbody").children()[1].children[1].innerHTML = "";
        const stretchVal = Math.round(dayBudgetVal + (($(".stretch-percent").val()/100) * dayBudgetVal));
        // $(".store-stats > tbody").children()[1].children[1].append(stretchVal);

        // Calculate sales target & connections neeeded per hour
        
        // Clear all existing values in sales target row before adding new values
        for (let i=1; i<=13; i++) {
            $(".operating-hours > tbody").children()[0].children[i].innerHTML = "";
            $("#con-target-"+i).html("");
        }

        const storeOpen = parseInt($(".store-open").val());
        const storeClose = parseInt($(".store-close").val());
        const workingHours = (12 + storeClose) - storeOpen;
    
        const salesTarget = stretchVal / workingHours;

        // Store hourly sales target & connections
        const storeHourlyStats = [];

        for (let i=1; i<=workingHours; i++) {
            const hourlySalesTarget = Math.ceil(salesTarget * i);
    
            const conTarget = Math.ceil(hourlySalesTarget / $(".stretch-atv").val());

            storeHourlyStats.push(
                {
                    hourlySalesTarget: hourlySalesTarget,
                    hourlyConnections: conTarget
                }
            );
        }

        // Calculate total connections required in the day 
        // Stretch Value
        $(".store-stats > tbody").children()[1].children[1].append(stretchVal);
        // Connections required to meet budget
        const budgetCon = Math.round($(".day-budget").val() / $(".budget-atv").val());
        // $(".store-stats > tbody").children()[0].children[4].innerHTML = `x ` + budgetCon;
        
        // Connections required to meet stretch
        const stretchCon = Math.round($(".stretch-budget").html() / parseInt($(".stretch-atv").val()));
        // $(".store-stats > tbody").children()[1].children[4].innerHTML = `x ` + stretchCon;

        
        // Calculate actual atv for the day
        let totalActualATV=0;
        let cntActualATV = 0;

        const storeActualATV = [];
        
        for (let i=1; i<totalEmpStatsRows; i++) {
            const actualATV = $(".emp-stats > tbody").children()[i].children[4].children[0].valueAsNumber;
            if (actualATV === 0 || isNaN(actualATV)) {
                cntActualATV+=1;
                continue;
            }
            totalActualATV+=actualATV;

            storeActualATV.push(actualATV);
        }
        const finalATV = Math.round(totalActualATV/(totalEmpStatsRows-(1+cntActualATV)));
        // $(".final-atv").html(finalATV);

        // Target UPT's

        const storeTargetUPT = [];

        for (let i=1; i<totalEmpStatsRows; i++) {
            const targetUPT = $(".emp-stats > tbody").children()[i].children[5].children[0].valueAsNumber;

            storeTargetUPT.push(targetUPT);
        };
        // Calculate actual UPT for the day
        let totalActualUPT=0;
        let cntActualUPT=0;
        
        const storeActualUPT = [];
        for (let i=1; i<totalEmpStatsRows; i++) {
            const actualUPT = $(".emp-stats > tbody").children()[i].children[6].children[0].valueAsNumber;
            if (actualUPT === 0 || isNaN(actualUPT)) {
                cntActualUPT+=1;
                continue;
            }
            totalActualUPT+=actualUPT;

            storeActualUPT.push(actualUPT);
        }
        const finalUPT = totalActualUPT/(totalEmpStatsRows-(1+cntActualUPT));
        // $(".final-upt").html(finalUPT.toFixed(2));

        // Calculate actual sales for the day
        let totalActualSales=0;

        const storeActualSales = [];

        for (let i=1; i<totalEmpStatsRows; i++) {
            const actualSales = $(".emp-stats > tbody").children()[i].children[2].children[0].valueAsNumber;

            if (isNaN(actualSales)) {
                continue;
            }
            totalActualSales+=actualSales;

            storeActualSales.push(actualSales);
        }
        // $(".final-sales").html(totalActualSales);

        
        // $(".final-connections").html(Math.round(totalActualSales/finalATV));

        // Push all calculated values to an array so they can be pushed to local storage
        dailyFigures.push(
            {
                finalSales: totalActualSales,
                finalCons: Math.round(totalActualSales/finalATV),
                finalUPT: finalUPT.toFixed(2),
                finalATV: finalATV,
                budgetCon: budgetCon,
                stretchCon: stretchCon,
                stretchVal: stretchVal,
                stretchPercent: $(".stretch-percent").val(),
                stretchATV: parseInt($(".stretch-atv").val()),
                averageATV: averageATV,
                dayBudget: dayBudgetVal,
                totalHours: totalHours,
                workingHours: parseInt(workingHours),
                storeOpen: storeOpen,
                storeClose: storeClose
            }
        );        
        
        dailyFigures.push([...storeHourlyStats], [...storeActualATV], [...storeActualUPT], [...storeActualSales], [...storeTargetATV], [...storeTargetUPT], [...openingHours]);

        storeDailyFigures();
        // renderDailyFigures();
        location.reload();
    });

    // Calculate actual connections and mark if they are greater than target or not
    // $(".sales-actual").change(event => {
    //     const actualSale = event.target.valueAsNumber;
    //     let idx = 0;
    //     if (/-[0-9]/.test(event.target.id.substr(-2))) {
    //         idx = event.target.id.substr(-1);
    //     } else {
    //         idx = event.target.id.substr(-2);
    //     }
    //     const conActual = Math.floor(actualSale / $(".stretch-atv").val());

    //     $("#con-actual-"+idx).html(conActual);

    //     const targetValue = parseInt($("#con-target-"+idx).html());
    //     // Add green mark if actual hourly connections equal or are above target
    //     if (conActual >= targetValue) {
    //         $("#con-actual-"+idx).css("background-color", "green");
    //         $("#con-actual-"+idx).css("color", "white");
    //         $("#con-actual-"+idx).css("padding-left", "5px");
    //         $("#con-actual-"+idx).css("padding-right", "5px");
    //     } else {
    //         $("#con-actual-"+idx).css("background-color", "white");
    //         $("#con-actual-"+idx).css("color", "black");
    //     }
    // })


    function storeDailyFigures() {
        localStorage.setItem("dailyFigures", JSON.stringify(dailyFigures));
    }
})