function getColor(level) {
	var str;
	switch(level) {
	case 1:
		str="red";
		break;
	case 2:
		str="blue";
		break;
	case 3:
		str="yellow";
		break;
	}
	return str;
}

function getSubColorByMark(sub_mark) {
//	var sub_class = "mtk1";
	if(sub_mark != undefined) {
		switch(sub_mark) {
		case "sub_insert":
			return "mtk25";
			break;
		case "sub_delete":
			return "mtk4";
			break;
		case "sub_change":
			return "mtk6";
			break;
		}
	}
	return "mtk1";
}