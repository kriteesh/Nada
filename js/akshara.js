/**
 * Divides word into its aksharas
 * 
 * @param {string} sanskrit, hindi, gujarati
 * @param {string} actually word (single string without spaces). 
 * @returns {array} all the aksharas making up the word. 
 * @example
 *
 * akshara("sanskrit")("वैशम्पायन");
 * // => [ 'वै', 'शम्', 'पा', 'य', 'न' ]
 * akshara("hindi")("वैशम्पायन");
 * // => [ 'वै', 'शम्', 'पा', 'यन्' ]
 */

const akshara = lang => shabda => {
			var verse = shabda; 
			var res = ""; 
			var pew = "";
			var re;
			if(lang=="sanskrit")
			  re = /[ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह अ आ इ ई उ ऊ ऋ ॠ ॡ ए ऐ ओ औ ऌ ळ ](?!्)/g ;
			else if(lang=="hindi")
				{
					re = /[ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह अ आ इ ई उ ऊ ऋ ॠ ॡ ए ऐ ओ औ ऌ ळ ](?!्)/g ;
					let hindiArr =["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ॡ", "ए", "ऐ", "ओ", "औ", "ऌ", "ळ"];
					let jam = verse.slice(-1);
					if(hindiArr.filter(x=>x==jam)!=[])
						{
							verse  = verse + "्";
						}

				}
			else if(lang=="tamil")
			  re = /[அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஜ ஞ ட ண த ந ன ப ம ய ர ற ல ள ழ வ ஶ ஷ ஸ ஹ](?!ப்)/g;
			else if(lang=="gujarati")
			  re = /[અ આ ઇ ઈ ઉ ઊ ઋ ઌ ઍ એ ઐ ઑ ઓ ઔ ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ ળ વ શ ષ સ હ ૠ ૡ](?!\u0acd)/g;
			do {
				m = re.exec(verse);
				if (m) {
					res = res + m.index + "," ;
				}
			} while (m);

			res = res.split(",").filter(Boolean);
			res[0] ="0";
			verse = verse.split("");
			for(var i=0; i<=res.length-1;i++)
			{ 
				if(i==res.length-1)
				{ 
					for(var k=parseInt(res[res.length-1]); k<= verse.length-1; k++)
					{
						pew = pew + verse[k]; 
					}
				}

				for(var j=parseInt(res[i]);j<=parseInt(res[i+1])-1;j++)
				{
					pew = pew + verse[j];
				}
				pew = pew + "|"; 
			}

			pew = pew.split("|").filter(Boolean);
			return pew; 
		}