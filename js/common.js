$(function(){
    //选户型
    /*var select_box=$(".select_type .select_box");
    var select_ul=$(".select_type .select_ul");
    select_box.each(function(index){
        $(this).on("click",function(e){
            select_ul.hide();
            $(this).siblings("ul").toggle();
            e.stopPropagation();
            var select_ul_li=$(this).siblings("ul").find("li");
            select_ul_li.each(function() {
                $(this).on("touchend click", function () {
                    var val = $(this).text();
                    select_box.eq(index).text(val);
                    e.stopPropagation();
                });
            });
        });
    });
    $(document).on('click',function(){
        select_ul.hide();
    });*/

    //选户型
    var select_box=$(".select_type .select_box");
    var select_ul=$(".select_type .alert_type ul");
    var select_type_btn=$(".select_type .type_btn");
    //var tmp1=0,tmp2=0;
    var tmp_string='';

    select_box.click(function(){
       $(this).siblings(".alert_type").fadeIn("100","linear");
    });
    select_ul.each(function(){
        var select_ul_li=$(this).find("li");
        select_ul_li.each(function(){
            $(this).click(function() {
                $(this).addClass("active").siblings("li").removeClass("active");
            });
        });
    });
    select_type_btn.click(function(){
        tmp_string="";
        select_ul.each(function(){
            tmp_string+=$(this).find(".active").text();
        });
        //alert(tmp_string);
        $(this).parents(".alert_type").fadeOut("100","linear");
        select_box.text(tmp_string);
    });
    
    //导航
    var nav_state=0;
    $("#navigation_open").click(function(){
        /*$("#navigation").slideToggle();*/
        var w=$(window).width();
        if(nav_state==0){
            $("#navigation").animate({left:"0"},"500","linear");
            nav_state=1;
        }else{
            $("#navigation").animate({left:"100%"},"500","linear");
            nav_state=0;
        }
    });
    
});

//顾客提交
function toSubmit(r){
    $.ajax({
        type:'POST',
        //url:'https://www.54jxj.com/pc_customer',
        url:'https://',
        data:r,
        dataType:'json',
        success:function(data){
            alert(data.info);
            window.location.reload();
        },
        error:function(err){
            layer.open({
                style:'border:none;background:rgba(29,29,29,.5);color:#fff;',
                content:'信息提交失败!'
            });
        }
    });
};


//检查姓名
function checkName(val,state){
    if (/^[\u4E00-\u9FA5A-Za-z0-9]{1,8}$/.test(val)) {
        state=true;
        return state;
    } else {
        return false;
    };
};
//检查小区
function checkArea(val,state){
    if (/^[\u4E00-\u9FA5A-Za-z0-9]{1,8}$/.test(val)) {
        state=true;
        return state;
    } else {
        return false;
    };
};

//检查面积
function checkHouseSize(val,state){
    //if(/^[1-9]\d*$/.test(val)){
    if(/^[1-9]\d{1,4}$/.test(val)){
        state=true;
        return state;
    }else{
        return false;
    };
};
//检查手机号
function checkPhone(val,state){
    if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9])\d{8}$/.test(val)) {
        state=true;
        return state;
    }else{
        return false;
    };
};


