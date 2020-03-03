let main = document.getElementsByClassName('main')[0];
		
let preprocessing = sukta => {
	sukta = sukta.replace(/↵/g," ");
	sukta = sukta.replace(/[१२३४५६७८९०]/g,"");
	sukta = sukta.replace(/[1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM?,.()*&^%$#@!<>:+_]/g,"");
	sukta = sukta.replace(/\"/g,"");
	sukta = sukta.replace(/\'/g,"");
	sukta = sukta.replace(/;/g," ");
	sukta = sukta.replace(/-/g," ");
	sukta = sukta.replace(/॥/g,"||");
	sukta = sukta.replace(/।/g,"|");
			
	let shloka = sukta.split("||").filter(x=>x!="");
	let pankti = shloka.map(x=>x.split("|")).filter(x=>x!="");
	let shabda = pankti.map(x=>x.map(x=>x.split(" ").filter(x=>x!="")));
	let nada = shabda.map(x=>x.map(x=>x.map(x=>akshara("sanskrit")(x))));
	return [shloka,pankti,shabda,nada];
			
}
		
main.innerHTML = "<br>नमस्कार<br>❁ ❁ ❁ ❁<br><br>यह छन्दशास्त्र पर आधारित एक साधारण यन्त्र है<br>ऊपर के कोष में कितने भी श्लोक लिखें या पेस्ट करें<br>यन्त्र चलाने के लिए अक्षरित बटन दबाये<br>श्लोकों को अर्ध विराम ( | ) और पूर्ण विराम ( || ) के मानक के अनुसार ही लिखें<br> कोष को खाली करने के लिए हटाएं दबाएं <br><br>❁ ❁ ❁ ❁ ";

let p = 0;

let footer = document.getElementsByClassName('footer')[0];

footer.onclick = function (){
	main.innerHTML ='';
	convert(p);
	p++;
			
}
		
let looter = document.getElementsByClassName('looter')[0];
looter.onclick = function (){
	document.getElementById('content').innerHTML ='';
	main.innerHTML = '<br><br><br><br>आपने ऊपर के कोष से श्लोक हटा दिए है , अक्षर अध्ययन करने के लिए कोष में पुनः श्लोक डालें |<br><br>❁ ❁ ❁ ❁';
	p=0;
}
		
$("#content").click(function(){
    p = 0;
	document.getElementById("button").innerHTML = "अक्षरित";

});



document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    });


let convert = (n) =>{ 
	let arr = document.getElementById('content').innerText;
	arr = preprocessing(arr);
		
	document.getElementById("button").innerHTML = "अगला";
		
	if(n > arr[0].length-1) { main.innerHTML = "<br><br><br><br>श्लोक समाप्त हुए | ऊपर दिए गए श्लोक-कोष में नए श्लोक डाल कर अध्ययन करें | <br><br>❁ ❁ ❁ ❁"; document.getElementById("button").innerHTML = "श्लोक समाप्त"; }
	else if(n == arr[0].length-1) { p = 0; document.getElementById("button").innerHTML = "श्लोक समाप्त";}
			
	let verse = document.createElement('div');
	verse.className = "verseBox flex-container";
	verse.innerHTML = "❁   " + arr[0][n] + "   ❁";
		
	let line = document.createElement('div');
	line.className = "lineBox flex-container";
	let lines = arr[1][n].join()
	lines = lines.split(",")
	lines.map(x=>createFlex(line)('dabba')(x)); 
		
	let word = document.createElement('div');
	word.className = "wordBox flex-container";
	let words = arr[2][n].join()
	words = words.split(",")
	words.map(x=>createFlex(word)('dabba')(x)); 
		
	let letter = document.createElement('div');
	letter.className = "letterBox flex-container";
	let letters = arr[3][n].join()
	letters = letters.split(",")
	letters.map(x=>createFlex(letter)('dabba chyawanprash')(x));
				
	let qualia = document.createElement('div');
	qualia.className = "qualia";
	let syllables = arr[3][n].join().split(",")
	qualia.innerHTML = check(syllables)
			
			
	main.appendChild(qualia);
	main.appendChild(letter);
	main.appendChild(word);
	main.appendChild(line);
	main.appendChild(verse);

} 
		
let createFlex = parent => className => content => {let p = document.createElement('div'); p.className = className ; p.innerHTML = content ; parent.appendChild(p);}
		
let check = arr => {
	let jina ='';
	let temple = 0;
	for(i=0;i<=chhandArr.length-1;i++)
	{
		if(chhandArr[i][1]==arr.length) { jina = chhandArr[i][0]; temple = 1;}
					
	}
	if(temple==0) jina = "अज्ञात";
				
	if(arr.length < 16) return "यह श्लोक या तो अधूरा है या फिर यह श्लोक नहीं है , इसमें कुल " + arr.length + " अक्षर हैं";
				
	else return "इस श्लोक में कुल " + + arr.length + " अक्षर हैं, " + "यह " + jina +  " छंद में लिखा गया है";
				 
}

			
// Load the Google Transliterate API
google.load("elements", "1", {
	packages: "transliteration"
});
function onLoad() {
	var options = {
		sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
		destinationLanguage: [google.elements.transliteration.LanguageCode.SANSKRIT],
		shortcutKey: 'ctrl+g',
		transliterationEnabled: true
	};
	// Create an instance on TransliterationControl with the required
	// options.
	var control =
		new google.elements.transliteration.TransliterationControl(options);
	// Enable transliteration in the textbox with id
	// 'transliterateTextarea'.
	control.makeTransliteratable(['content']);
}
google.setOnLoadCallback(onLoad);	