/* AUTHOR: JORDAN RANDLEMAN */
/* IN HTML TEXTAREA ELEMENT: onkeydown="keyActive(event,this)" onkeyup="keyInactive(event,this)" */

/******************************************************************************/
/* KEY PRESS ON/OFF FUNCTIONS */
/******************************************************************************/

/* NGMA NOTEPAD DESIGNED SUCH THAT ALL NORMAL LOWERCASE AND "SHIFT"-KEY UPPERCASE 
ENGLISH LETTERS STILL WORK, AND THAT CAPSLOCK INITIALIZES NGMA LETTER TYPING */

var k = []; /* K ARRAY HOLDS CURRENTLY PRESSED KEY VALUES DURING CAPSLOCK */
var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','.',',','Shift'];
var noChangeKeys = ["Backspace","ArrowUp","ArrowDown","ArrowRight","ArrowLeft","Enter","?","!",":","0","1","2","3","4","5","6","7","8","9","&","~","(",")"," ","'",'"'];

function keyActive(event, elem) {
	var ch = event.key;
	if(!event.getModifierState("CapsLock") || noChangeKeys.indexOf(ch) > -1) {
		return;
	}
	event.preventDefault();
	k[chars.indexOf(ch)] = true;
	
	if(k[28]) { /* SHIFT */
		shiftPress(event,elem);
	} else if(k[26] || k[27]) { /* . , */
		puncPress(event,elem);
	} else if(k[0] || k[4] || k[8] || k[14] || k[20]) { /* A E I O U */
		vowelPress(event,elem);
	}else if(k[1] || k[3] || k[5] || k[6] || k[7] || k[9] || k[10] || k[11] || k[12] || k[13] || k[15] || k[17] || k[18] || k[19] || k[21] || k[22] || k[23] || k[24] || k[25]){
		consonantPress(event,elem); /* B D F G H J K L M N P R S T V W X Y Z */
	}
	return;
}


function keyInactive(event) {
	k[chars.indexOf(event.key)] = false;
	return;
}

/******************************************************************************/
/* CAPS + SHIFT  */
/******************************************************************************/

function shiftPress(event, elem) {
	if(k[chars.indexOf('H')]) { /* H-COMBOS */
		if(k[chars.indexOf('C')]) { /* CH */
			typeAtCursor(elem,String.fromCharCode(935));
		} else if(k[chars.indexOf('S')]) { /* SH */
			typeAtCursor(elem,String.fromCharCode(936));
		} else if(k[chars.indexOf('T')]) { /* TH */
			typeAtCursor(elem,String.fromCharCode(920));
		}
	} else if(k[chars.indexOf('T')]) { /* T-COMBOS */
		if(k[chars.indexOf('F')]) { /* FT */
			typeAtCursor(elem,String.fromCharCode(964));
		} else if(k[chars.indexOf('K')]) { /* CT */
			typeAtCursor(elem,String.fromCharCode(0x0043));
		} else if(k[chars.indexOf('N')]) { /* NT */
			typeAtCursor(elem,String.fromCharCode(0x5201));
		} else if(k[chars.indexOf('S')]) { /* ST */
			typeAtCursor(elem,String.fromCharCode(0x1560));
		} else if(k[chars.indexOf('E')]) { /* THEN */
			typeAtCursor(elem,String.fromCharCode(0x0D24));
		}
	} else if(k[chars.indexOf('N')]) { /* ENDING-COMBOS */
		if(k[chars.indexOf('L')]) { /* LY */
			typeAtCursor(elem,String.fromCharCode(0x01338));
		} else if(k[chars.indexOf('K')]) { /* NK */
			typeAtCursor(elem,String.fromCharCode(0x004E));
		} else if(k[chars.indexOf('D')]) { /* ND */
			typeAtCursor(elem,String.fromCharCode(0x2207));
		} else if(k[chars.indexOf('G')]) { /* NG */
			typeAtCursor(elem,String.fromCharCode(0x0AEA));
		}
	} else if(k[chars.indexOf('W')]) { /* WORD-COMBOS */
		if(k[chars.indexOf('B')]) { /* BECAUSE */
			typeAtCursor(elem,String.fromCharCode(0x0CEC));
		} else if(k[chars.indexOf('D')]) { /* DIFFERENT */
			typeAtCursor(elem,String.fromCharCode(0x2260));
		} else if(k[chars.indexOf('G')]) { /* GOOD */
			typeAtCursor(elem,String.fromCharCode(0x00A7));
		} else if(k[chars.indexOf('S')]) { /* SO/THEREFORE */
			typeAtCursor(elem,String.fromCharCode(0x2234));
		} else if(k[chars.indexOf('P')]) { /* PEOPLE/PERSON */
			typeAtCursor(elem,String.fromCharCode(0x1E8A));
		} else if(k[chars.indexOf('M')]) { /* MAN */
			typeAtCursor(elem,String.fromCharCode(0x2642));
		} else if(k[chars.indexOf('L')]) { /* LEFT */
			typeAtCursor(elem,String.fromCharCode(171));
		} else if(k[chars.indexOf('R')]) { /* RIGHT */
			typeAtCursor(elem,String.fromCharCode(187));
		}
	} else if(k[chars.indexOf('B')]) { /* BEE */
		typeAtCursor(elem,String.fromCharCode(914));
	} else if(k[chars.indexOf('D')]) { /* DEE */
		typeAtCursor(elem,String.fromCharCode(0x1402));
	} else if(k[chars.indexOf('L')]) { /* EL */
		typeAtCursor(elem,String.fromCharCode(0x1430));
	} else if(k[chars.indexOf('J')]) { /* VI(S)ION */
		typeAtCursor(elem,String.fromCharCode(0x04FE));
	} else if(k[chars.indexOf('S')]) { /* TS */
		typeAtCursor(elem,String.fromCharCode(0x00DF));
	} else if(k[chars.indexOf('R')]) { /* (ARE) */
		typeAtCursor(elem,String.fromCharCode(0x0052));
	}
	return;
}

/******************************************************************************/
/* CAPS + PUNCTUATION  */
/******************************************************************************/

function puncPress(event, elem) {
	if(k[chars.indexOf('.')]) {
		typeAtCursor(elem,String.fromCharCode(0x2216));
	} else if(k[chars.indexOf(',')]) {
		typeAtCursor(elem,String.fromCharCode(0x002D));
	}
	return;
}

/******************************************************************************/
/* CAPS + VOWEL  */
/******************************************************************************/

function vowelPress(event, elem) { 
	/* EACH PRESS CHECKS THROUGH ENTIRE IF SERIES THEREFORE "UE" NEEDS TO BE CALLED UNDER 
	"E" OTHERWISE THE SECOND KEY PRESS WONT REGISTER AS A CHILD OF E PRESS IF UNDER U */
	if(k[chars.indexOf('A')]) {
		if(k[chars.indexOf('H')]) { /* l(a)b */
			typeAtCursor(elem,String.fromCharCode(913));
		} else if(k[chars.indexOf('E')]) { /* (a)le */
			typeAtCursor(elem,String.fromCharCode(919));
		} else if(k[chars.indexOf('I')]) { /* l(ie) */
			typeAtCursor(elem,String.fromCharCode(921));
		} else if(k[chars.indexOf('W')]) { /* l(aw) */
			typeAtCursor(elem,String.fromCharCode(968));
		} else if(k[chars.indexOf('T')]) { /* h(at) */
			typeAtCursor(elem,String.fromCharCode(0x0466));
		} else if(k[chars.indexOf('R')]) { /* h(air) */
			typeAtCursor(elem,String.fromCharCode(228));
		} else if(k[chars.indexOf('O')]) { /* l(oa)d */
			typeAtCursor(elem,String.fromCharCode(937));
		} 
	} else if(k[chars.indexOf('E')]) {
		if(k[chars.indexOf('H')]) { /* (e)dge */
			typeAtCursor(elem,String.fromCharCode(949));
		} else if(k[chars.indexOf('I')]) { /* (ee)l */
			typeAtCursor(elem,String.fromCharCode(917));
		} else if(k[chars.indexOf('T')]) { /* b(eat) */
			typeAtCursor(elem,String.fromCharCode(0x0CEE));
		} else if(k[chars.indexOf('D')]) { /* b(ed) */
			typeAtCursor(elem,String.fromCharCode(0x2661));
		} else if(k[chars.indexOf('R')]) { /* h(ere) */
			typeAtCursor(elem,String.fromCharCode(0x260B));
		} else if(k[chars.indexOf('U')]) { /* bl(ue) */
			typeAtCursor(elem,String.fromCharCode(960));
		} 
	} else if(k[chars.indexOf('I')]) {
		if(k[chars.indexOf('H')]) { /* b(i)t */
			typeAtCursor(elem,String.fromCharCode(953));
		} else if(k[chars.indexOf('T')]) { /* b(it) */
			typeAtCursor(elem,String.fromCharCode(0x0074));
		} else if(k[chars.indexOf('N')]) { /* b(ing) */
			typeAtCursor(elem,String.fromCharCode(0x04A8));
		} else if(k[chars.indexOf('R')]) { /* h(ear)d */
			typeAtCursor(elem,String.fromCharCode(0x10B4));
		} else if(k[chars.indexOf('O')]) { /* b(oi)l */
			typeAtCursor(elem,String.fromCharCode(0x155F));
		} 
	} else if(k[chars.indexOf('O')]) {
		if(k[chars.indexOf('W')]) { /* l(ou)d */
			typeAtCursor(elem,String.fromCharCode(969));
		} else if(k[chars.indexOf('U')]) { /* c(ou)ld */
			typeAtCursor(elem,String.fromCharCode(0x144E));
		} else if(k[chars.indexOf('N')]) { /* lo(tion) */
			typeAtCursor(elem,String.fromCharCode(0x00B0));
		} else if(k[chars.indexOf('S')]) { /* vic(ious) */
			typeAtCursor(elem,String.fromCharCode(0x14D0));
		} else if(k[chars.indexOf('R')]) { /* c(ore) */
			typeAtCursor(elem,String.fromCharCode(927));
		}
	} else if(k[chars.indexOf('U')]) {
		if(k[chars.indexOf('H')]) { /* l(o)ve */
			typeAtCursor(elem,String.fromCharCode(0x0427));
		} else if(k[chars.indexOf('Y')]) { /* (you) */
			typeAtCursor(elem,String.fromCharCode(933));
		}
	}
	return;
}

/******************************************************************************/
/* CAPS + CONSONANT  */
/******************************************************************************/

function consonantPress(event, elem) {
	if(k[chars.indexOf('B')]) {
		typeAtCursor(elem,String.fromCharCode(946));
	} else if(k[chars.indexOf('D')]) {
		typeAtCursor(elem,String.fromCharCode(916));
	} else if(k[chars.indexOf('F')]) {
		typeAtCursor(elem,String.fromCharCode(934));
	} else if(k[chars.indexOf('G')]) {
		typeAtCursor(elem,String.fromCharCode(915));
	} else if(k[chars.indexOf('H')]) {
		typeAtCursor(elem,String.fromCharCode(951));
	} else if(k[chars.indexOf('J')]) {
		typeAtCursor(elem,String.fromCharCode(967));
	} else if(k[chars.indexOf('K')]) {
		typeAtCursor(elem,String.fromCharCode(0x30B9));
	} else if(k[chars.indexOf('L')]) {
		typeAtCursor(elem,String.fromCharCode(923));
	} else if(k[chars.indexOf('M')]) {
		typeAtCursor(elem,String.fromCharCode(956));
	} else if(k[chars.indexOf('N')]) {
		typeAtCursor(elem,String.fromCharCode(957));
	} else if(k[chars.indexOf('P')]) {
		typeAtCursor(elem,String.fromCharCode(928));
	} else if(k[chars.indexOf('R')]) {
		typeAtCursor(elem,String.fromCharCode(929));
	} else if(k[chars.indexOf('S')]) {
		typeAtCursor(elem,String.fromCharCode(931));
	} else if(k[chars.indexOf('T')]) {
		typeAtCursor(elem,String.fromCharCode(932));
	} else if(k[chars.indexOf('V')]) {
		typeAtCursor(elem,String.fromCharCode(965));
	} else if(k[chars.indexOf('W')]) {
		typeAtCursor(elem,String.fromCharCode(948));
	} else if(k[chars.indexOf('X')]) {
		typeAtCursor(elem,String.fromCharCode(926));
	} else if(k[chars.indexOf('Y')]) {
		typeAtCursor(elem,String.fromCharCode(955));
	} else if(k[chars.indexOf('Z')]) {
		typeAtCursor(elem,String.fromCharCode(950));
	}
	return;
}

/******************************************************************************/
/* ENTER CHAR PRE CURSOR'S IDX FUNCTION */
/******************************************************************************/

function typeAtCursor(element, char) { /* ENTER TEXT WHERE THE CURSOR IS */
	var pre = element.selectionStart, post = element.selectionEnd; /* CHAR IDX PRE/POST CURSOR */
	var txt = element.value;
	element.value = (txt.substring(0, pre) + char + txt.substring(post, txt.length));
	element.selectionStart = element.selectionEnd = pre + 1; /* PUT CURSOR AFTER SPLICED CHAR */
}
