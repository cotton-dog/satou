/* ==================================================
   SATOU LOCK SCREEN SYSTEM
================================================== */

const LockScreen = (() => {

    const weekDays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];


    /* =========================
       创建锁屏
    ========================= */

    async function init(){

        const screen =
            document.getElementById(
                "screen-content"
            );


        const response =
            await fetch(
                "./pages/lock-screen.html"
            );


        const html =
            await response.text();


        screen.insertAdjacentHTML(
            "beforeend",
            html
        );


        updateDateTime();


        setInterval(
            updateDateTime,
            1000
        );


        setupButtons();
    }


    /* =========================
       时间日期
    ========================= */

    function updateDateTime(){

        const now =
            new Date();


        const hh =
            String(
                now.getHours()
            ).padStart(2,"0");


        const mm =
            String(
                now.getMinutes()
            ).padStart(2,"0");


        const time =
            `${hh}:${mm}`;


        const clock =
            document.getElementById(
                "clock-time"
            );


        const date =
            document.getElementById(
                "clock-date"
            );


        if(clock){

            clock.textContent =
                time;
        }


        /*
         * 状态栏时间也由公共状态栏负责
         */

        if(
            typeof StatusBar !==
            "undefined"
        ){

            StatusBar.updateTime();
        }


        if(!date) return;


        const lunar =
            typeof Lunar !==
            "undefined"
                ? Lunar.solar2lunar(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    now.getDate()
                )
                : null;


        if(lunar){

            date.textContent =
                `${now.getMonth()+1}月${now.getDate()}日 ` +
                `${weekDays[now.getDay()]} · ` +
                `${lunar.ganZhiYear}年 ` +
                `${lunar.monthCn}${lunar.dayCn}`;

        }else{

            date.textContent =
                `${now.getMonth()+1}月${now.getDate()}日 ` +
                `${weekDays[now.getDay()]}`;
        }
    }


    /* =========================
       底部按钮
    ========================= */

    function setupButtons(){

        const flashlight =
            document.getElementById(
                "flashlight-btn"
            );


        const camera =
            document.getElementById(
                "camera-btn"
            );


        if(flashlight){

            flashlight.addEventListener(
                "click",
                ()=>{

                    flashlight.classList.toggle(
                        "active"
                    );

                }
            );
        }


        if(camera){

            camera.addEventListener(
                "click",
                ()=>{

                    console.log(
                        "Camera"
                    );

                }
            );
        }
    }


    return {

        init,

        updateDateTime

    };

})();