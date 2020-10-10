$("#button").click(function () {
	// getting the input
	var prompt = $("#prompt").val();
	var bellOption = $("input[name='bellChar']:checked").val();

	//days and month mapping
	var days = new Map();
	days.set(0, "Sun");
	days.set(1, "Mon");
	days.set(2, "Tue");
	days.set(3, "Wed");
	days.set(4, "Thu");
	days.set(5, "Fri");
	days.set(6, "Sat");

	var mon = new Map();
	mon.set(0, "Jan");
	mon.set(1, "Feb");
	mon.set(2, "Mar");
	mon.set(3, "Apr");
	mon.set(4, "May");
	mon.set(5, "Jun");
	mon.set(6, "Jul");
	mon.set(7, "Aug");
	mon.set(8, "Sep");
	mon.set(9, "Oct");
	mon.set(10, "Nov");
	mon.set(11, "Dec");

	var defColor = "black";
	var colorMaps = new Map();
	colorMaps.set("30", "black");
	colorMaps.set("31", "red");
	colorMaps.set("32", "green");
	colorMaps.set("33", "yellow");
	colorMaps.set("34", "blue");
	colorMaps.set("35", "magenta");
	colorMaps.set("36", "cyan");
	colorMaps.set("37", "white");
	colorMaps.set("38", "cyan");
	colorMaps.set("39", defColor);

	var output = "";
	var currColor = defColor;

	function setTime(i) {
		return i < 10 ? "0" + i : i;
	}
	function isDigit(i) {
		return i >= "0" && i <= "9";
	}

	function toAscii(a, b, c) {
		return 64 * Number(a) + 8 * Number(b) + Number(c);
	}

	var defStyle = "";
	var currStyle = defStyle;
	function styler(text, style) {
		if (style == "bold") {
			text = text.bold();
		}
		if (style == "italic") {
			text = text.italics();
		}
		if (style == "st") {
			text = text.strike();
		}
		return text;
	}

	// no magic numbers!
	const bellReplacement = "BEL";

	// deals with the bell sound
	var bell = new Audio('gong.mp3');

	for (var i = 0; i < prompt.length; i++) {
		if (prompt.charAt(i) == "\\" && i + 1 < prompt.length) {
			var d = new Date();
			var nextChar = prompt.charAt(i + 1);

			if (nextChar == "e") {
				i++;
				nextChar = prompt.charAt(i + 1);
			}
			switch (nextChar) {
				case "a":
					if (bellOption == "text") {
						output += bellReplacement;
					}
					else if (bellOption == "audio") {
						bell.play();
					}
					break;
				case "h":
					var j = 0;
					var hostname = $("#hostname").val();
					while (j != hostname.length && hostname.charAt(j) != ".") {
						console.log(currStyle);
						output += styler(hostname.charAt(j).fontcolor(currColor), currStyle);
						j++;
					}
					break;
				case "H":
					output += styler($("#hostname").val().fontcolor(currColor), currStyle);
					break;
				case "j":
					output += styler($("#jobs").val().fontcolor(currColor), currStyle);
					break;
				case "#":
					output += styler($("#comm").val().fontcolor(currColor), currStyle);
					break;
				case "l":
					output += styler($("#term").val().fontcolor(currColor), currStyle);
					break;
				case "s":
					output += styler($("#shell").val().fontcolor(currColor), currStyle);
					break;
				case "!":
					output += styler($("#hist").val().fontcolor(currColor), currStyle);
					break;
				case "u":
					output += styler($("#user").val().fontcolor(currColor), currStyle);
					break;
				case "v":
					output += styler($("#version").val().fontcolor(currColor), currStyle);
					break;
				case "V":
					output += styler($("#release").val().fontcolor(currColor), currStyle);
					break;
				// next line ones
				case "r":
				case "n":
					output += "<br/>";
					break;
				case "d":
					output +=
						styler(
							String(setTime(days.get(d.getDay()))).fontcolor(currColor),
							currStyle
						) +
						" " +
						styler(
							String(setTime(mon.get(d.getMonth()))).fontcolor(currColor),
							currStyle
						) +
						" " +
						styler(String(setTime(d.getDate())).fontcolor(currColor), currStyle);
					break;
				// all time-based ones
				case "t":
					output +=
						styler(String(setTime(d.getHours())).fontcolor(currColor), currStyle) +
						":" +
						styler(
							String(setTime(d.getMinutes())).fontcolor(currColor),
							currStyle
						) +
						":" +
						styler(String(setTime(d.getSeconds())).fontcolor(currColor), currStyle);
					break;
				case "A":
					output +=
						styler(String(setTime(d.getHours())).fontcolor(currColor), currStyle) +
						":" +
						styler(
							String(setTime(d.getMinutes())).fontcolor(currColor),
							currStyler
						);
					break;
				case "T":
					var hrs = d.getHours();
					if (hrs > 12) {
						hrs -= 12;
					}
					output +=
						styler(String(setTime(hrs)).fontcolor(currColor), currStyle) +
						":" +
						styler(
							String(setTime(d.getMinutes())).fontcolor(currColor),
							currStyle
						) +
						":" +
						styler(String(setTime(d.getSeconds())).fontcolor(currColor), currStyle);
					break;
				case "\\":
					output += "\\";
					break;
				case "@":
					var hrs = d.getHours();
					var foo = hrs >= 12 ? "PM" : "AM";
					if (hrs > 12) {
						hrs -= 12;
					}
					output +=
						styler(String(setTime(hrs)).fontcolor(currColor), currStyle) +
						":" +
						styler(
							String(setTime(d.getMinutes())).fontcolor(currColor),
							currStyle
						) +
						" " +
						styler(foo.fontcolor(currColor), currStyle);
					break;
				case "w":
					var pwd = $("#pwd").val();
					if (pwd.length > 0 && pwd.charAt(0) == "~") {
						styler((output += pwd.fontcolor(currColor)), currStyle);
					} else if (pwd.length > 6 && pwd.indexOf("/home/") == 0) {
						// ignore /home/
						// update the counter!
						output += styler("~".fontcolor(currColor), currStyle);
						var j = 6;
						while (j < pwd.length && pwd.charAt(j) != "/") {
							j++;
						}
						// take every thing from counter to end!
						while (j < pwd.length) {
							output += styler(pwd.charAt(j).fontcolor(currColor), currStyle);
							j++;
						}
					} else if (pwd.length == 0) {
					} else {
						alert("Not valid working directory!");
					}
					break;
				case "W":
					var pwd = $("#pwd").val();
					// start at the end and keep appending
					var temp = "";
					var j = pwd.length - 1;
					while (j > 0 && pwd.charAt(j) != "/") {
						temp += pwd.charAt(j);
						j--;
					}
					temp = temp.split("").reverse().join("");
					output += styler(temp.fontcolor(currColor), currStyle);
					break;
				case "[":
					if (i > 0 && prompt.charAt(i) == "e") {
						// probably indicates a color/style choice!
						// what we're using to get the data
						var foo = "";
						// get the style/color
						while (i + 2 < prompt.length && prompt.charAt(i + 2) != "m") {
							foo += prompt.charAt(i + 2);
							i++;
						}
						i++; // get past the m
						var bar = foo.substring(foo.length - 2, foo.length);
						if (colorMaps.has(bar)) {
							currColor = colorMaps.get(bar);
						} else if (foo.length == 0) {
							currColor = defColor;
						}

						switch (foo[0]) {
							case "1":
								currStyle = "bold";
								break;
							case "2":
								currStyle = "st";
								break;
							case "3":
								currStyle = "italics";
								break;
							default:
								currStyle = defStyle;
								break;
						}
					}
					break;
				case "]":
					break;
				default:
					if (
						i + 3 < prompt.length &&
						isDigit(nextChar) &&
						isDigit(prompt.charAt(i + 2) && isDigit(prompt.charAt(i + 3)))
					) {
						var x = toAscii(nextChar, prompt.charAt(i + 2), prompt.charAt(i + 3));
						if (x >= 0 && x <= 127) {
							output += styler(String.fromCharCode(x).fontcolor(currColor), currStyle);
							i += 2;
						}
					} else {
						output += styler(nextChar.fontcolor(currColor), currStyle);
					}
					break;
			}
			i++;
		} else if (prompt.charAt(i) == "\\") {
		} else {
			output += styler(prompt.charAt(i).fontcolor(currColor), currStyle);
		}
	}

	document.getElementById("demo").innerHTML = output;
});

$("#tocopy").click(function () {
	var copyText = document.getElementById("prompt");

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	document.execCommand("copy");
});

function myFunction(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
	  x.className += " w3-show";
	}
	else { 
	  x.className = x.className.replace(" w3-show", "");
	}
}