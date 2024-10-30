
export const generateRandomId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

export const checkIsRecent = (date: string) => {
    let todayDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();

    let givenDay = date.split('-')[0];
    let givenMonth = date.split('-')[1];
    let givenYear = date.split('-')[2];
    if (currentYear !== Number(givenYear)) {
        return false;
    }
    if (currentMonth === Number(givenMonth) || currentMonth === Number(givenMonth) - 1) {
        if (todayDate >= Number(givenDay)) {
            if ((todayDate - Number(givenDay)) < 8) {
                return true;
            }
        } else {
            let days = 31 - Number(givenDay);
            let totalDays = days + todayDate;
            if (totalDays < 8) {
                return true;
            }
        }
    } else {
        return false;
    }


    return false;
}
