function Calc(){
    var eP=document.getElementById('eP').value,
    sL=document.getElementById('sL').value,
    blnc=document.getElementById('blnc').value,
    rskPrc=document.getElementById('rskPrc').value,
    tP=document.getElementById('tP').value,
    slc=100_000_000,
    rskRng=Math.abs(rskRng=(eP-sL)*slc),
    prftRng=Math.abs(prftRng=(eP-tP)*slc),
    rsk=rskPrc*0.01,
    rskAmnt=document.getElementById('rskAmnt').value=blnc*rsk,
    slcdEP=eP*slc,
    ppVl=rskAmnt/rskRng,
    SIZE=document.getElementById('SIZE').value=(ppVl*slcdEP).toFixed(8);

    document.getElementById('lvrg').innerHTML=Math.ceil((SIZE/blnc)) + 'x';

    if (tP=true){
        var prftAmnt=document.getElementById('prftAmnt').value=(ppVl*prftRng).toFixed(8);
        prftPrcntg=document.getElementById('prftPrcntg').value=(((prftAmnt/blnc)*100).toFixed(2)) + '%';
    }

    rRRt=document.getElementById('rRRt').value=((prftAmnt/rskAmnt).toFixed(2)) + ':1';
}




function copy() {
  /* Get the text field */
  let copyText = document.getElementById("SIZE");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}