/* ==================================================
   SATOU 电池系统
================================================== */

const BatterySystem = (() => {

    let battery = null;

    const MAX_WIDTH = 1220;
    const MIN_WIDTH = 60;


    /* =========================
       绘制电量
    ========================= */

    function render(level, charging){

        const fill =
            document.getElementById("battery-fill");

        if(!fill) return;

        const safeLevel =
            Math.max(0, Math.min(1, level));

        const width =
            Math.max(
                MIN_WIDTH,
                Math.round(safeLevel * MAX_WIDTH)
            );

        fill.setAttribute(
            "width",
            width
        );

        if(charging){

            fill.style.fill =
                "#30d158";

        }else{

            fill.style.fill =
                "";
        }
    }


    /* =========================
       更新
    ========================= */

    function update(){

        if(!battery) return;

        render(
            battery.level,
            battery.charging
        );
    }


    /* =========================
       初始化
    ========================= */

    async function init(){

        /*
         * Battery Status API
         *
         * 注意：
         * 某些浏览器为了隐私/安全原因
         * 不允许网页读取真实电量。
         */

        if(
            !("getBattery" in navigator)
        ){

            render(1,false);

            return;
        }


        try{

            battery =
                await navigator.getBattery();


            /* 电量改变 */

            battery.addEventListener(
                "levelchange",
                update
            );


            /* 充电状态改变 */

            battery.addEventListener(
                "chargingchange",
                update
            );


            /* 充电时间改变 */

            battery.addEventListener(
                "chargingtimechange",
                update
            );


            /* 放电时间改变 */

            battery.addEventListener(
                "dischargingtimechange",
                update
            );


            /* 第一次立即更新 */

            update();


        }catch(error){

            console.log(
                "无法读取设备电量:",
                error
            );

            render(1,false);
        }
    }


    return{

        init,

        update,

        getBattery(){
            return battery;
        }

    };

})();