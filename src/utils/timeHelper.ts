export const getTimeDif = (time: number) => {
    const date1 = new Date(time);
    const date2 = new Date();

    let postfix: string;
    if (date1 > date2)
        postfix = "دیگه";
    else
        postfix = "ago";

    function render(unit: string, count: number) {
        return count > 1 ? `${count} ${unit}s ${postfix}` : `one ${unit} ${postfix}`
    }

// To calculate the time difference of two dates
    let Difference_In_Time = Math.abs(date2.getTime() - date1.getTime());

// To calculate the no. of days between two dates
    const Difference_In_Years = Math.floor(Difference_In_Time / (1000 * 3600 * 24 * 365));
    if (Difference_In_Years !== 0)
        return render("year",Difference_In_Years);
    Difference_In_Time -= Difference_In_Years * (1000 * 3600 * 24 * 365);
    const Difference_In_Months = Math.floor(Difference_In_Time / (1000 * 3600 * 24 * 30));
    if (Difference_In_Months !== 0)
        return render("month",Difference_In_Months);
    Difference_In_Time -= Difference_In_Months * (1000 * 3600 * 24 * 30);
    const Difference_In_Weeks = Math.floor(Difference_In_Time / (1000 * 3600 * 24 * 7));
    if (Difference_In_Weeks !== 0)
        return render("week",Difference_In_Weeks);
    Difference_In_Time -= Difference_In_Weeks * (1000 * 3600 * 24 * 7);
    const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    if (Difference_In_Days !== 0)
        return render("day",Difference_In_Days);
    Difference_In_Time -= Difference_In_Days * (1000 * 3600 * 24);
    const Difference_In_Hours = Math.floor(Difference_In_Time / (1000 * 3600));
    if (Difference_In_Hours !== 0)
        return render("hour",Difference_In_Hours);
    Difference_In_Time -= Difference_In_Days * (1000 * 3600);
    const Difference_In_Mins = Math.floor(Difference_In_Time / (1000 * 60));
    if (Difference_In_Mins !== 0)
        return render("min",Difference_In_Mins);
    Difference_In_Time -= Difference_In_Mins * (1000 * 60);
    const Difference_In_Secs = Math.floor(Difference_In_Time / (1000));
    if (Difference_In_Secs > 30)
        return "one minute ago";
    if (Difference_In_Secs < 30)
        return `a moment ago`;
    Difference_In_Time -= Difference_In_Secs * (1000);
    return "now";
};
