(function($){
    $.fn.soMenuRespond = function(options){

        var init = {
            "level" : 2,
            "debug" : false,
            "nameBlock" : "soMenuRespondBlock",
            "cloneLink" : true,
            "TextLink" : "Retour",
            "classLink" : "",
            "savePosition" : true,
            "speed" : 400
        };
        var parametres = $.extend(init,options);

        var debugLog = function(message){
            if(parametres.debug && typeof(console) != "undefined"){
                console.log(message);
            }
        }

        var buildNoeud = function(level){
            var element = "";
            for(var i=0;i<level;i++){
                element += " ul li ";
            }
            return element;
        }

        var getNameBlockMenu = function(){
            for(var i=1;i<1000;i++){
                if($("#"+parametres.nameBlock+"_"+i).length == 0)
                    return parametres.nameBlock+"_"+i;
            }
        }

        var setNameBlockMenuRespond = function(e){
            parametres.nameBlock = e;
        }

        var getNameBlockMenuRespond = function(){
            return parametres.nameBlock;
        }
        var viewOtherMenu = function(element,animate){

            var widthElement = $(element).width();
            var animate = typeof(animate) == "undefined" ? true : animate;
            var id_element = $(element).attr("id");


            var content_link = (parametres.cloneLink) ? $("#"+getNameBlockMenuRespond()+" #"+id_element+" a").html() : parametres.TextLink;
            var content = $("#"+getNameBlockMenuRespond()+" #"+id_element+" ul").html();

            if($("#"+getNameBlockMenuRespond()+" .soMenuRp").length == 0)
                $("#"+getNameBlockMenuRespond()).append('<div class="soMenuRp '+parametres.classLink+'" style="width: '+widthElement+'px; float:left"></div>');

            $("#"+getNameBlockMenuRespond()+" .soMenuRp").html('<ul><li><a>'+content_link+'</a></li><li>'+content+'</li></ul>');

            $("#"+getNameBlockMenuRespond()+" .soMenuRp ul li a:first").on("click",function(){
                backMenu();
            });
            if(animate)
                $("#"+getNameBlockMenuRespond()).animate({left: "-"+widthElement+"px"},parametres.speed);
            else{
              //  alert("#"+getNameBlockMenuRespond()+" "+widthElement);
                $("#"+getNameBlockMenuRespond()).css("left","-"+widthElement+"px");
            }
        }

        var backMenu = function (){
            $("#"+getNameBlockMenuRespond()).animate({left: "0px"},parametres.speed);
            if(parametres.savePosition)
                $.removeCookie("ccMenuRp_"+getNameBlockMenuRespond());
        }

        //Encapsulation des donnees
        debugLog("width element : "+$(this).width());
        setNameBlockMenuRespond(getNameBlockMenu());

        if(parametres.savePosition){
            if(typeof($.cookie) == "undefined"){
                alert("Warning Jquery.cookie is not install, if you don't want to save position turn to false the variable savePosition");
                return false;
            }
        }

        return this.each(function(){

            var blockNoeud = "."+$(this).attr("class")+buildNoeud(parametres.level);
            $($(this)).wrap('<div style="overflow:hidden; width:'+$(this).width()+'px"><div id="'+getNameBlockMenuRespond()+'" style="position:relative;width: '+($(this).width()*2)+'px;"></div></div>');
            $(this).attr("style","float:left");
            var cpt = 1;
                $(blockNoeud).each(function(){

                    //detection des li ayant des ul
                    if($(this).find("ul").length > 0){
                        if(typeof($(this).attr("id")) == "undefined" || $(this).attr("id") == ""){
                            $(this).attr("id","soMenuRespondLi_"+cpt);
                            cpt++;
                        }
                        debugLog("Add DOM to ID "+"#"+getNameBlockMenuRespond()+" #"+$(this).attr("id"));


                        $("body").on("click","#"+getNameBlockMenuRespond()+" #"+$(this).attr("id"),function(){

                            if(parametres.savePosition)
                                $.cookie("ccMenuRp_"+getNameBlockMenuRespond(),getNameBlockMenuRespond()+" #"+$(this).attr("id"));

                            viewOtherMenu(this);
                        });
                    }

                });
                if(typeof($.cookie("ccMenuRp_"+getNameBlockMenuRespond())) != "undefined" && parametres.savePosition)
                    viewOtherMenu("#"+$.cookie("ccMenuRp_"+getNameBlockMenuRespond()),false);
        });

    };
})(jQuery);