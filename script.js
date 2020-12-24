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
})