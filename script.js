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
            <td><input type="number" step="0.1" class="work-hours"></td>
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

    // Automatically calcualate employee wise sales targets
})