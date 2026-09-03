/* ==================================================
   SATOU 壁纸系统
================================================== */

const Wallpaper = (() => {

    let canvas = null;
    let ctx = null;

    let current = {
        type:"gradient",
        stops:[
            "#6a7ea8",
            "#8b6ea3",
            "#a8778f"
        ]
    };


    function init(){

        canvas =
            document.createElement("canvas");

        canvas.id =
            "wallpaper";

        canvas.style.position =
            "absolute";

        canvas.style.inset =
            "0";

        canvas.style.width =
            "100%";

        canvas.style.height =
            "100%";

        canvas.style.zIndex =
            "0";


        const screen =
            document.querySelector(
                ".screen-content"
            );

        screen.prepend(canvas);


        ctx =
            canvas.getContext(
                "2d",
                {
                    willReadFrequently:true
                }
            );


        resize();

        window.addEventListener(
            "resize",
            resize
        );
    }


    function resize(){

        if(!canvas || !ctx) return;

        const rect =
            canvas.getBoundingClientRect();

        const dpr =
            window.devicePixelRatio || 1;


        canvas.width =
            Math.round(
                rect.width * dpr
            );

        canvas.height =
            Math.round(
                rect.height * dpr
            );


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        draw();
    }


    function draw(){

        if(!ctx) return;

        const rect =
            canvas.getBoundingClientRect();

        const w =
            rect.width;

        const h =
            rect.height;


        if(current.type === "color"){

            ctx.fillStyle =
                current.value;

            ctx.fillRect(
                0,
                0,
                w,
                h
            );

        }


        else if(
            current.type === "gradient"
        ){

            const g =
                ctx.createLinearGradient(
                    0,
                    0,
                    w * .35,
                    h
                );


            current.stops.forEach(
                (color,index)=>{

                    g.addColorStop(
                        index /
                        (current.stops.length - 1),
                        color
                    );

                }
            );


            ctx.fillStyle = g;

            ctx.fillRect(
                0,
                0,
                w,
                h
            );
        }


        if(
            typeof AdaptiveTheme !==
            "undefined"
        ){

            AdaptiveTheme.refresh();
        }
    }


    return{

        init,

        setColor(color){

            current = {
                type:"color",
                value:color
            };

            draw();
        },

        setGradient(stops){

            current = {
                type:"gradient",
                stops:stops
            };

            draw();
        }

    };

})();