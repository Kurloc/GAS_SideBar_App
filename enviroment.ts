const environment = {
    sideBarDashBoarURL: 'Insert Database sheet url for this app. I created a standalone sheet to share with users... this may not be best for a public app, but this is not that. Its designed for internal work flows',
    production: false
};
const userEmail = Session.getEffectiveUser().getEmail();

const today = new Date();
const todayStringMonthDayYear = (today.getMonth()+1 + '-' + today.getDate() + '-' + today.getFullYear());
const todayStringYearMonthDay = (today.getFullYear() + '-' + today.getMonth()+1 + '-' + today.getDate());

const MyReferrals = GetMyReferrals();
const locationName = 'Insert Site Name Here';
