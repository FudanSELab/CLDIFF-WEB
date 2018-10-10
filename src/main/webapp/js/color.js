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

function getColorByType(type) {
	switch(type) {
	case "Insert":
		return "rgba(0, 205, 102)";
		break;
	case "Delete":
		return "rgba(255, 0, 0)";
		break;
	case "Change":
		return "rgb(10, 49, 255)";
		break;
	case "Move":
		return "rgb(255, 185, 15)";
		break;
	case "Change.Move":
		return "rgb(255, 185, 15)";
		break;
	}	
	return "red";
}