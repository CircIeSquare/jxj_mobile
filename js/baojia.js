$(function(){

   var select_option=$(".baojia_content .select_option");

   select_option.each(function(index){
        var child_option=$(this).find("li");

       child_option.each(function(index1){
            $(this).click(function(){
                $(this).addClass("active").siblings("li").removeClass("active");
                //alert(index);
                //alert(index1);
                if(index==1){
                    child_option.removeClass("active");
                    child_option.eq(index1).addClass("active");
                    house_type_val=index1;
                };
                if(index==3){
                    child_option.removeClass("active");
                    child_option.eq(index1).addClass("active");
                    house_style_val=index1;
                };
            });
        });
   });


   //var house_mold=["新房装修","旧房翻新"];
   var house_mold=["新房装修","旧房翻新","二手房装修"];
   var house_type=["一室一厅","两室两厅","四室一厅","一室两厅","三室一厅","四室两厅","两室一厅","三室两厅"];
   //var house_type2=["老房翻新","二手房装修"];
   var house_style=["现代风格","美式风格","地中海","中式风格","田园风格","还没想好简单实用就行","新中式","欧式风格"];
   var house_lastIdea=["往期案例发您","直接0元设计"];

   var customer_information={
       "house_mold":"",
       "city":"",
       //"house_type":"",
       //"house_type2":"",
       "house_size":"",
       "house_style":"",
       "phone":"",
       "house_lastIdea":"",
       "name":"",
       "WX_Number":""
   };

   var content1=$(".baojia_content1");
   var content2=$(".baojia_content2");
   var content2_2=$(".baojia_content2_2");
   var content3=$(".baojia_content3");
   var content4=$(".baojia_content4");
   var content5=$(".baojia_content5");
   var content6=$(".baojia_content6");

   //选择房屋类型与城市
   var content1_btn=$(".baojia_content1 .step_btn");
   var content1_city=$(".baojia_content1 select");
   content1_btn.click(function (){
       var index=$(".baojia_content1 .select_option .active").index();
       if(content1_city.val()=="请选择房屋所在城市"){
           alert("您还没有选择房屋所在城市");
       }else{
           //alert("房屋类型:"+house_mold[index]+",城市:"+content1_city.val());
           customer_information.house_mold=house_mold[index];
           customer_information.city=content1_city.val();
           alert(JSON.stringify(customer_information));
            if(index==0){
                content1.hide();
                content2.show();
            }else{
                content1.hide();
                content2_2.show();
            };
       };
   });

   //选择户型与面积
   var content2_prev_step=$(".baojia_content2 .prev_step");
   var content2_next_step=$(".baojia_content2 .next_step");
   var content2_house_size=$(".baojia_content2 #bj_house_size");
   var content2_houseSize_state=false;
   var house_type_val=0;

   content2_house_size.blur(function(){
       content2_houseSize_state=checkHouseSize(content2_house_size.val(),content2_houseSize_state);
   });
   content2_prev_step.click(function(){
       content2.hide();
       content1.show();
   });
   content2_next_step.click(function(){
       if(content2_houseSize_state==true){
           //alert("房屋户型:"+house_type[house_type_val]+",面积:"+content2_house_size.val());
           customer_information.house_type=house_type[house_type_val];
           customer_information.house_size=content2_house_size.val();
           alert(JSON.stringify(customer_information));

           content2.hide();
           content3.show();
       }else{
           alert("请输入正确的面积(填写数字)!");
       };
   });


    //选择户型与面积2
    var content22_prev_step=$(".baojia_content2_2 .prev_step");
    var content22_next_step=$(".baojia_content2_2 .next_step");
    var content22_house_size=$(".baojia_content2_2 .bj_house_size");
    var content22_houseSize_state=false;
    //var house_type_val2=0;

    content22_house_size.blur(function(){
        content22_houseSize_state=checkHouseSize(content22_house_size.val(),content22_houseSize_state);
    });
    content22_prev_step.click(function(){
        content2_2.hide();
        content1.show();
    });
    content22_next_step.click(function(){
        var index=$(".baojia_content2_2 .select_option .active").index();
        if(content22_houseSize_state==true){
            //alert("房屋户型:"+house_type2[index]+",面积:"+content22_house_size.val());
            //customer_information.house_type2=house_type2[index];

            customer_information.house_mold=house_mold[index+1];
            customer_information.house_size=content22_house_size.val();
            alert(JSON.stringify(customer_information));

            content2_2.hide();
            content3.show();
        }else{
            alert("请输入正确的面积(填写数字)!");
        };
    });


    //选择装修风格
    var content3_calculation_btn=$(".baojia_content3 .calculator_btn");
    var content3_phone=$(".baojia_content3 #bj_phone");
    var content3_info_log=$(".baojia_content3 .info_log");
    var content3_phone_state=false;
    var house_style_val=0;
    $(".baojia_content3 .msg_open").click(function () {
        $(".baojia_content3 .msg_content").toggle();
    });
    content3_phone.blur(function(){
        content3_phone_state=checkPhone(content3_phone.val(),content3_phone_state);
    });
    content3_calculation_btn.click(function () {
        if(content3_phone_state==true){
            //alert("装修风格:"+house_style[house_style_val]+",电话号码:"+content3_phone.val());
            customer_information.house_style=house_style[house_style_val];
            customer_information.phone=content3_phone.val();
            alert(JSON.stringify(customer_information));

            content3.hide();
            content4.show();
            content3_info_log.css("opacity","0");

            var size=parseInt(customer_information.house_size);
            //console.log(size);

            baojia_content5_price_all.text(Calculation_price(size));
            baojia_content5_price_cl.text(Calculation_price(size)*0.4);
            baojia_content5_price_rg.text(Calculation_price(size)*0.6);

            //
            setTimeout(function(){
                content4.hide();
                content5.show();
            },5000);

        }else{
            //alert("请输入正确的电话号码(填写数字)!");
            content3_info_log.css("opacity","1");
        };
    });

    //计算报价
    function Calculation_price(size){
        return size*588;
    };

    //提交
    var baojia_content5_price_all=$(".baojia_content5 .price_all");     //全包
    var baojia_content5_price_cl=$(".baojia_content5 .price_cl");       //材料费
    var baojia_content5_price_rg=$(".baojia_content5 .price_rg");       //人工费
    var baojia_content5_price_sj0=$(".baojia_content5 .price_sj0")      //设计费0
    var baojia_content5_price_sj1=$(".baojia_content5 .price_sj1")      //设计费1
    var baojia_content5_price_zj0=$(".baojia_content5 .price_zj0")      //质检费0
    var baojia_content5_price_zj1=$(".baojia_content5 .price_zj1")      //质检费1

    var baojia_content5_bj_name=$(".baojia_content5 #bj_name");
    var baojia_content5_bj_wx_number=$(".baojia_content5 #bj_wx_number");
    var baojia_content5_submit=$(".baojia_content5 .submit_btn");

    var baojia_content5_name_state=false;
    var baojia_content5_WX_state=false;
    baojia_content5_bj_name.blur(function(){
        baojia_content5_name_state=checkName(baojia_content5_bj_name.val(),baojia_content5_name_state);
    });
    baojia_content5_bj_wx_number.blur(function(){
        baojia_content5_WX_state=checkWX(baojia_content5_bj_wx_number.val(),baojia_content5_WX_state);
    });
    baojia_content5_submit.click(function () {
        var index=$(".baojia_content5 .select_option .active").index();
        if(baojia_content5_name_state&&baojia_content5_WX_state){
            //alert("您的称呼:"+baojia_content5_bj_name.val()+"您的微信号:"+baojia_content5_bj_wx_number.val()+"意向:"+house_lastIdea[index]);
            customer_information.name=baojia_content5_bj_name.val();
            customer_information.WX_Number=baojia_content5_bj_wx_number.val();
            customer_information.house_lastIdea=house_lastIdea[index];

            var information=JSON.stringify(customer_information);
            alert(information);


            content3_phone_state=checkPhone(content3_phone.val(),content3_phone_state);
            var content_houseSize_state=false;
            content_houseSize_state=checkHouseSize(customer_information.house_size,content_houseSize_state);

            //if(content1_city.val()!=="请选择房屋所在城市"&&content3_phone_state&&/^[1-9]\d{1,4}$/.test(customer_information.house_size)){
            if(content1_city.val()!=="请选择房屋所在城市"&&content3_phone_state&&content_houseSize_state){
                content5.hide();
                content6.show();

                //toSubmit(information);
            }else{
                alert("请检查城市、电话号、房屋面积是否填写正确");
            };
        }else if(baojia_content5_name_state==false&&baojia_content5_WX_state==true){
            alert("请输入正确的姓名!(中文或英文)");
        }else if(baojia_content5_name_state==true&&baojia_content5_WX_state==false){
            alert("请输入正确的微信号!(字母数字-和_)");
        }else if(baojia_content5_name_state==false&&baojia_content5_WX_state==false){
            alert("请输入您的姓名和微信号后点击提交！");
        }else{
            //alert("请检查城市、电话号、房屋面积是否填写正确");
            alert("请信息填写是否填写正确");
        };
    });

});