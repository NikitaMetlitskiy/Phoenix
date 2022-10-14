import Vue from 'vue';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    screens: {
        "tablet": "768px",
        "laptop": '1024px',
        "desktop": '1440px'
    },
});
