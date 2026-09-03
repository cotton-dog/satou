/* ==================================================
   SATOU MAIN
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {


        /* =========================
           公共状态栏
        ========================= */

        StatusBar.create();


        /* =========================
           壁纸
        ========================= */

        Wallpaper.init();


        /* =========================
           锁屏
        ========================= */

        await LockScreen.init();


        /* =========================
           电池
        ========================= */

        BatterySystem.init();


        /* =========================
           Service Worker
        ========================= */

        if(
            "serviceWorker" in navigator
        ){

            window.addEventListener(
                "load",
                ()=>{

                    navigator.serviceWorker
                    .register("./sw.js")

                    .then(()=>{

                        console.log(
                            "satou PWA 已启动"
                        );

                    })

                    .catch(error=>{

                        console.log(
                            "Service Worker 注册失败",
                            error
                        );

                    });

                }
            );
        }


        /* =========================
           禁止手势缩放
        ========================= */

        document.addEventListener(
            "gesturestart",
            event =>
                event.preventDefault()
        );


        /* =========================
           禁止双击缩放
        ========================= */

        let lastTouchEnd = 0;


        document.addEventListener(
            "touchend",
            event => {

                const now =
                    Date.now();


                if(
                    now - lastTouchEnd <= 300
                ){

                    event.preventDefault();

                }


                lastTouchEnd =
                    now;

            },
            false
        );

    }
);