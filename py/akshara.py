import re
def akshara(छन्द):
    s=[]
    f=[]
    छन्द = छन्द.replace("॑","")
    छन्द = छन्द.replace("॒","")
    छन्द = छन्द.replace("।","")
    
    rx = re.compile('([॒॑१७३०४६५८९२.])')

    छन्द = rx.sub('', छन्द)
    छन्द = छन्द.split(" ")
    शब्द =[]
    while '' in छन्द:
        छन्द.remove('')
    for x in range(len(छन्द)):
            शब्द+= छन्द[x] + "!"
        
                
            
    शब्द =''.join(शब्द)
    शब्द = शब्द.split("!")
    while '' in शब्द:
        शब्द.remove('')
    for verse in शब्द:
        regex = r"[ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह अ आ इ ई उ ऊ ऋ ॠ ॡ ए ऐ ओ औ ऌ ](?!्)"
        z=0  
        d =[]
        iter = re.finditer(regex,verse)
        indices = [n.start(0) for n in iter]          
        for x in range(len(indices)):
            if(x!=len(indices)-1):
                c = (indices[x+1] - indices[x])
                for y in range(c):
                    if((x==0) and (y==0)and verse[0]!=verse[indices[0]]):
                        f=verse[0:2]
                        d+=f
                    d+=verse[indices[x]+y]
            else:
                while(verse[indices[x]+z]!=verse[-1:]):
                    d+=verse[indices[x]+z]
                    z+=1

            d+="~"
        d=''.join(d)
        d+=verse[-1:]
        d=d.split("~") 
        e = ''.join(d[-2:])
        d[len(d)-2] = e
        del d[-1]
#       print(d)  --> for printing word-wise syllables
        s+=d
        f=[]
    return s

def frequency(अक्षर):
    r = dict((x,अक्षर.count(x)) for x in set(अक्षर))
    r = sorted(r.items(), key=lambda x: x[1])
    return r


def metre(छन्द):
    count_full = len(akshara(छन्द))
    rx = re.compile('([॒॑१७३०४६५८९२.])')
    छन्द = rx.sub('', छन्द)
    छन्द = छन्द.split("|")
    while '' in छन्द :
        छन्द.remove('')
    temp=0
    for line in छन्द:
        temp+=1
        count = len(akshara(line))
        print(("%d in line no. %d")%(count,temp))
                    
    if(count_full==32):
        print("This is written in अनुष्टुभ् meter ")
    elif(count_full==40):
        print("This is written in Pankti meter ")
    elif(count_full==48):
        print("This is written in Jagati meter ")
    elif(count_full==24):
        print("This is written in Gayatri meter ")
    elif(count_full==44):
        print("This is written in Tristubh meter ")
    elif(count_full==36):
        print("This is written in Brihati meter ")
    elif(count_full==28):
        print("This is written in Usnih meter ")
    
