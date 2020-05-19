<?php define("TPATH", dirname(__FILE__) . "/"); ?>
<?
    $Pcode = "setting";
    $Parr = array("ADMIN", "BROWSE", "BROWSE_SELF");
    include(TPATH . "_check.php");
    BTAG();
    $rid = intGet('rid');
    $sql = "select * from system_config where display='Y' and deleted=0";
    SQLS($sql);
    $r = TOP();
    $rows = array();
    if (!empty($r)) {
        foreach ($r as $key => $row) {
            $rows[$row['config_name']] = $row;
        }
    }
    unset($row);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>
    <? include("title_common.php"); ?>
    <? include("head_common.php"); ?>
    <style>
        .column_list_li {
            margin-bottom: 20px;
        }

        .column_list_li input {
            padding: 5px 12px 6px;
        }

        .submit_div {
            margin-top: 20px;
        }

        .submit_div button {
            margin-left: 10px;
            margin-right: 10px;
        }
    </style>
</head>

<body class="no-skin">
<? include("top_common.php"); ?>
<div class="main-container" id="main-container">

    <? include("nav_common.php"); ?>
    <div class="main-content">
        <div class="page-content">
            <? include("skin_common.php"); ?>
            <!-- /section:settings.box -->
            <div class="page-content-area">
                <? include("page_header.php"); ?><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">

                        <div class="well well-sm">
                            <button type="button" class="close line-height-0" data-dismiss="alert">
                                <i class="ace-icon fa fa-times smaller-75"></i>
                            </button>
                            此页内容为独立页面设计，一般情况无需修改。
                        </div>
                        <form id="form1" name='form1' action="" method="post">
                            <div class="col-xs-12 col-sm-8">
                                <div class="widget-box">
                                    <div class="widget-header">
                                        <h4 class="widget-title">相关参数设置 </h4>
                                        <div class="widget-toolbar">
                                            <a href="#" data-action="collapse">
                                                <i class="ace-icon fa fa-chevron-up"></i>
                                            </a>
                                        </div>
                                    </div>


                                    <div class="widget-body">

                                        <div class="widget-main">
                                            <div>
                                                <label><b>订房到店支付：</b></label>
                                                <label>　允许</label>
                                                <input type="radio" name="in_shop_pay" class="pb_fields"
                                                       value="1" <?php if ($rows['in_shop_pay']['config_value'] == 1) echo " checked "; ?>/>

                                                <label>　　禁用</label>
                                                <input type="radio" name="in_shop_pay" class="pb_fields"
                                                       value="0" <?php if ($rows['in_shop_pay']['config_value'] == 0) echo " checked "; ?>/>

                                                <span style="color: red;margin-left: 10px;">　注：</span>开启后：用户预订非当日房间，支付时可选择“在线支付”或“到店支付”。


                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>


                                        <div class="widget-main">
                                            <div>
                                                <label><b>微信支付拒单：</b></label>
                                                <label>　开启</label>
                                                <input type="radio" name="is_wx_refuse" class="pb_fields"
                                                       value="1" <?php if ($rows['is_wx_refuse']['config_value'] == 1) echo " checked "; ?>/>

                                                <label>　　关闭</label>
                                                <input type="radio" name="is_wx_refuse" class="pb_fields"
                                                       value="0" <?php if ($rows['is_wx_refuse']['config_value'] == 0) echo " checked "; ?>/>

                                                <span style="color: red;margin-left: 10px;">　注：</span>开启后：后台微信支付待确定订单详情显示出拒单按钮

                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>

                                        <div class="widget-main">
                                            <div>
                                                <label><b>到店支付拒单：</b></label>
                                                <label>　开启</label>
                                                <input type="radio" name="is_shop_refuse" class="pb_fields"
                                                       value="1" <?php if ($rows['is_shop_refuse']['config_value'] == 1) echo " checked "; ?>/>

                                                <label>　　关闭</label>
                                                <input type="radio" name="is_shop_refuse" class="pb_fields"
                                                       value="0" <?php if ($rows['is_shop_refuse']['config_value'] == 0) echo " checked "; ?>/>

                                                <span style="color: red;margin-left: 10px;">　注：</span>开启后：后台前台到付待确定订单详情显示出拒单按钮。

                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>


                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div>
                                                    <label><b>一级下线消费返还积分比例：</b></label>
                                                    <input type="number" name="first_return_points" class="pb_fields"
                                                           value="<?php echo $rows['first_return_points']['config_value']?$rows['first_return_points']['config_value']:0; ?>"
                                                    />
                                                    <span>%</span>

                                                </div>
                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>


                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div>
                                                    <label><b>二级下线消费返还积分比例：</b></label>
                                                    <input type="number" name="second_return_points" class="pb_fields"
                                                           value="<?php echo $rows['second_return_points']['config_value']?$rows['second_return_points']['config_value']:0; ?>"
                                                    />
                                                    <span>%</span>

                                                </div>
                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>




                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div>
                                                    <label><b>订单有效时间：</b></label>
                                                    <input type="number" name="order_expire" class="pb_fields"
                                                           value="<?php echo $rows['order_expire']['config_value']?$rows['order_expire']['config_value']:30; ?>"
                                                    />
                                                    <span>分钟</span>

                                                </div>
                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>



                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div>
                                                    <label><b>客服电话：</b></label>
                                                    <input type="text" name="service_phone" class="pb_fields"
                                                           value="<?php echo $rows['service_phone']['config_value']; ?>"
                                                    />
                                                </div>
                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>

                                        
                                        

                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div>
                                                    <label><b>订房文字声明　　　　　　：</b></label>
                                                    <textarea style="width: 485px;height: 60px;" name="book_user_desc" class="pb_fields"><?php echo $rows['book_user_desc']['config_value']?$rows['book_user_desc']['config_value']:"";?></textarea>
                                                </div>
                                                <div class="cleatfix"></div>
                                            </div>
                                        </div>




                                        <div class="submit_div" style="margin:top:60px;margin-bottom: 40px;">
                                            <button class="btn btn-info" type="button" onclick="submit_data();">
                                                <i class="ace-icon fa fa-check bigger-110"></i>
                                                提交
                                            </button>

                                            <button class="btn" type="reset">
                                                <i class="ace-icon fa fa-undo bigger-110"></i>
                                                重置
                                            </button>
                                        </div>


                                        <!--                                    <div class="widget-body">-->
                                        <!--                                        <div class="widget-main">-->
                                        <!--                                            <div>-->
                                        <!--                                                <label><b>订单提醒手机：</b></label>-->
                                        <!--                                                <input type="number" name="order_remind_sms" id="order_remind_sms"-->
                                        <!--                                                       class="pb_fields" placeholder="请输入手机号"-->
                                        <!--                                                       value=""-->
                                        <!--                                                size="40"/>-->
                                        <!--                                            </div>-->
                                        <!--                                            <div class="cleatfix"></div>-->
                                        <!--                                        </div>-->
                                        <!--                                    </div>-->


                                    </div>


                                </div>

                        </form>

                        <!-- 内页内容 PAGE CONTENT ENDS -->

                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.page-content-area -->
        </div><!-- /.page-content -->
    </div><!-- /.main-content -->
</div><!-- /.main-container -->
<!-- page specific plugin scripts -->
<script language="javascript">
    var rid = <? echo (int)$rid;?>;
</script>
<script language="javascript">
    //#####需要配置#########
    var pbdataTables = false; //加载dataTables
    var pbhprose = true; //加载hprose
    var pbdatepicker = false; //加载datepicker
    var pbeditable = false; //加载editable
    var pbace = true; //加载ace,列表必须的
    //#####需要配置##end#######
</script>
<script type="text/javascript" src="<? echo HOST_PUBLIC; ?>/assets/js/jquery.dataTables.pbinfo.v2017.js"></script>
<script language="javascript">
    function plupload_callback(that, id, responseObj) {
        if (responseObj.status == 200) {
            var arr = JSON.parse(responseObj.response);
            $("#img_" + id + ">img").attr("src", arr.images_s + "?" + Math.random());
        }
    }

    function plupload_del_callback(that, uploadmode, index) {
        var target = $(that).closest("div.uploader_style1");
        pbclient.set_empty(uploadmode, index, function (result) {
            if (result == 1) {
            } else {
                kalert('操作失败');
            }
        });
    }

    function add_production_coupon() {
        var html = '<div class="production_column_li column_list_li">\n' +
            '                                                                <input type="number" name="production_column_orders[]"\n' +
            '                                                                       value=""/>个订单以上，生产时间需\n' +
            '                                                                <input type="number" name="production_column_days[]"\n' +
            '                                                                       value=""/>天\n' +
            '                                                                <span class="middle"><i\n' +
            '                                                                            class="delMeal ace-icon fa fa-trash-o red bigger-130 middle"\n' +
            '                                                                            onclick="remove_production_column(this);"></i></span>\n' +
            '                                                            </div>';
        $(".production_column_ul").append(html);
    }

    function remove_production_column(obj) {
        $(obj).closest(".production_column_li").remove();
    }

    function submit_data() {
        var arr = getPbFieldsVal($(".pb_fields"));
        var tips = "";

        pbclient.opt(1, arr, function (result) {
            if (result.code == 1) {
                kalert("提交成功");
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
            } else {
                kalert("提交失败");
            }
        });
    }

    $(function () {
        setClient("setting.server.php?rid=" + rid, ['opt']);
    });
</script>
<script type="text/javascript"
        src="<? echo HOST_PUBLIC; ?>/assets/js/plupload/plupload.pbinfo.img.multi.js?v=2017"></script>
</body>
</html>


