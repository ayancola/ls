<?php define("TPATH", dirname(__FILE__) . "/"); ?>
<?php include(TPATH . "../_common/config.inc.php"); ?>
<?php
    header('Content-Type: text/html; charset=utf-8');
    session_start();
    $Pcode = "setting";
    $Parr = array("ADMIN", "BROWSE", "ADD", "ADD_SELF", "MODIFY", "MODIFY_SELF");
    $rid = intGet('rid');
    BTAG();
    include(SITE_ROOT . "/libs/Hprose/php5/HproseHttpServer.php");
    include(TPATH . "_checkRPCServer.php");

    function opt($id, $arr)
    {
        if (!empty($arr)) {
            foreach ($arr as $key => $row) {
                if ($key == 'in_shop_pay') {
                    if ($row != 1) {
                        $row = 0;
                    }
                } elseif($key=='is_wx_refuse'||$key=='is_shop_refuse'){
                    if ($row != 1) {
                        $row = 0;
                    }
                }elseif ($key == 'order_expire') {
                    $row = (int)$row;
                    if ($row <= 0) {
                        return array("code" => 0, "msg" => "订单有效时间不能不能为0");
                    }
                    $row = (int)$row;
                } else if ($key == 'first_return_points') {
                    $row = floatval($row);
                    if ($row < 0 || $row > 100) {
                        return array("code" => 0, "msg" => "一级下线消费返还积分比例设置错误");
                    }
                } else if ($key == "second_return_points") {
                    $row = floatval($row);
                    if ($row < 0 || $row > 100) {
                        return array("code" => 0, "msg" => "二级下线消费返还积分比例设置错误");
                    }
                } elseif (in_array($key, array("coupon_user_desc", "book_user_desc","service_phone"))) {
                    $row = $row;
                } else {
                    continue;
                }
                $sql = "update system_config set config_value=? where config_name=?";
                SQL($sql, array($row, $key));
            }
        }
        return array("code" => 1, "msg" => "提交成功");
    }

    function del($ids)
    {
        $className = loadModule("site_config", "class");
        $class = new $className;
        $class->set("opter", $_SESSION['session_user_account']);
        return $class->del($ids);
    }

    function savefield($objstr, $txt)
    {
        $className = loadModule("site_config", "class");
        $class = new $className();
        $class->set("fieldsArr", array("first_order_column", "room_coupon_josn", "display", "orders"));
        if ($objstr == "first_order_column") {
            $txt = (int)$txt;
        }
        $class->set("opter", $_SESSION['session_user_account']);
        $result = $class->savefield($objstr, $txt);
        return $result;
    }


    function set_empty($uploadmode, $index)
    {
        $className = loadModule("site_config", "class");
        $class = new $className();
        $class->set("opter", $_SESSION['session_user_account']);
        $result = $class->set_empty($uploadmode, $index);
        return $result;
    }

    $Hserver = new HproseHttpServer();
    $Hserver->addFunction('opt');
    $Hserver->addFunction('del');
    $Hserver->addFunction('savefield');
    $Hserver->addFunction('set_empty');
    $Hserver->setGetEnabled(false);
    $Hserver->handle();

?>