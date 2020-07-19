import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Picker,
  FlatList
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { AntDesign } from "@expo/vector-icons";
import { Input, Text, Button, Icon, Radio } from "galio-framework";
import IconRadio from "./IconRadio";

export default class IconSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem = ({ item }) => {
    return (<IconRadio
      changeCurrentIcon={this.props.changeCurrentIcon}
      active={false}
      iconName={item.iconName}
      color={this.props.iconColor}
    />);
  };

  render() {
    let iconNameList = ["stepforward","stepbackward","forward","banckward","caretright","caretleft","caretdown","caretup","rightcircle","leftcircle","upcircle","downcircle","rightcircleo","leftcircleo","upcircleo","downcircleo","verticleleft","verticleright","back","retweet","shrink","arrowsalt","doubleright","doubleleft","arrowdown","arrowup","arrowright","arrowleft","down","up","right","left","minussquareo","minuscircle","minuscircleo","minus","pluscircleo","pluscircle","plus","infocirlce","infocirlceo","info","exclamation","exclamationcircle","exclamationcircleo","closecircle","closecircleo","checkcircle","checkcircleo","check","close","customerservice","creditcard","codesquareo","book","barschart","bars","question","questioncircle","questioncircleo","pause","pausecircle","pausecircleo","clockcircle","clockcircleo","swap","swapleft","swapright","plussquareo","frown","menufold","mail","link","areachart","linechart","home","laptop","star","staro","filter","meho","meh","shoppingcart","save","user","videocamera","totop","team","sharealt","setting","picture","phone","paperclip","notification","menuunfold","inbox","lock","qrcode","tags","tagso","cloudo","cloud","cloudupload","clouddownload","clouddownloado","clouduploado","enviroment","enviromento","eye","eyeo","camera","camerao","windows","export2","export","circledowno","circledown","hdd","ie","delete","enter","pushpino","pushpin","heart","hearto","smile-circle","smileo","frowno","calculator","chrome","github","iconfontdesktop","caretcircleoup","upload","download","piechart","lock1","unlock","windowso","dotchart","barchart","codesquare","plussquare","minussquare","closesquare","closesquareo","checksquare","checksquareo","fastbackward","fastforward","upsquare","downsquare","leftsquare","rightsquare","rightsquareo","leftsquareo","down-square-o","up-square-o","play","playcircleo","tag","tago","addfile","folder1","file1","switcher","addfolder","folderopen","search1","ellipsis1","calendar","filetext1","copy1","jpgfile1","pdffile1","exclefile1","pptfile1","unknowfile1","wordfile1","dingding","dingding-o","mobile1","tablet1","bells","disconnect","database","barcode","hourglass","key","flag","layout","printer","USB","skin","tool","car","addusergroup","carryout","deleteuser","deleteusergroup","man","isv","gift","idcard","medicinebox","redenvelopes","rest","Safety","wallet","woman","adduser","bank","Trophy","loading1","loading2","like2","dislike2","like1","dislike1","bulb1","rocket1","select1","apple1","apple-o","android1","android","aliwangwang-o1","aliwangwang","pay-circle1","pay-circle-o1","poweroff","trademark","find","copyright","sound","earth","wifi","sync","login","logout","reload1","message1","shake","API","appstore-o","appstore1","scan1","exception1","contacts","solution1","fork","edit","form","warning","table","profile","dashboard","indent-left","indent-right","menu-unfold","menu-fold","antdesign","alipay-square","codepen-circle","google","amazon","codepen","facebook-square","dropbox","googleplus","linkedin-square","medium-monogram","gitlab","medium-wordmark","QQ","skype","taobao-square","alipay-circle","youtube","wechat","twitter","weibo","HTML","taobao-circle","weibo-circle","weibo-square","CodeSandbox","aliyun","zhihu","behance","dribbble","dribbble-square","behance-square","file-markdown","instagram","yuque","slack","slack-square"];
    let iconList = [];
    let key = 0;
    for (let iconName of iconNameList) {
        iconList.push({iconName, key: key.toString()});
        key+=1;
    }
    // console.log(iconList);
    return (
      <ScrollView horizontal={true} style={{height: 300}}>
        <FlatList numColumns={70} data={iconList} renderItem={this.renderItem} />
      </ScrollView>
    );
  }
}

