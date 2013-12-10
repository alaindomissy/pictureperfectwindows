// JavaScript Document

var name_num=0;
var email_num=0;
var phone_num=0;
var message_num=0;

function chNam(input) {
	if(name_num < 1) {
		input.className='input_text_over';
		input.value = '';
	}
	name_num++;
}
function chEma(input) {
	if(email_num < 1) {
		input.className='input_text_over';
		input.value = '';
	}
	email_num++;
}
function chPho(input) {
	if(phone_num < 1) {
		input.className='input_text_over';
		input.value = '';
	}
	phone_num++;
}
function chMes(input) {
	if(message_num < 1) {
		input.className='input_text_over';
		input.value = '';
	}
	message_num++;
}
function seeNam(input) {
	if(input.value == '') {
		input.className='input_text';
		input.value = 'Your Name';
		name_num=0;
	}
}
function seeEma(input) {
	if(input.value == '') {
		input.className='input_text';
		input.value = 'Your Email';
		email_num=0;
	}
}
function seePho(input) {
	if(input.value == '') {
		input.className='input_text';
		input.value = 'Your Phone Number';
		phone_num=0;
	}
}
function seeMes(input) {
	if(input.value == '') {
		input.className='input_text';
		input.value = 'Enter your message...';
		message_num=0;
	}
}

function check_contactForm(form) {
	var badChars = "!#$%^&*()+=[]\';,/{}|\":<>?~` ";
	$('.error').css('display','none');
	
	var containsBadChars = false;
	for(var i=0; i<badChars.length; i++) {
		if(form.email.value.indexOf(badChars.charAt(i)) > 0) {
			containsBadChars = true;
		}
	}
	
	if(form.name.value == '' || form.name.value == 'Your Name') {
		$('.error').html('Please enter your name').fadeIn();
		return;
	} else if(form.email.value == '' || form.email.value == 'Your Email') {
		$('.error').html('Please enter your email address').fadeIn();
		return;
	} else if(form.email.value.indexOf('@') < 1 || form.email.value.indexOf('.') < 1 || containsBadChars) {
		$('.error').html('Please enter a valid email address').fadeIn();
		return;
	} else if(form.message.value == '' || form.message.value == 'Enter your message...') {
		$('.error').html('Please construct a message').fadeIn();
		return;
	}
	
	var name = form.name.value;
	var email = form.email.value;
	var phone;
	if(form.phone.value == 'Your Phone Number') {
		phone = '';
	} else {
		phone = form.phone.value;
	}
	var message = form.message.value;
	
	$('#contact #c-content').slideUp();
	$('#contact #loading').slideDown();
	
	$.post("contact-send.php",{"name":name,"email":email,"phone":phone,"message":message},function() {
		$('#contact #loading').css('display','none');
		$('#contact #c-content').html('<p class=last>Thank you for sending us your inquiry, you should expect a response within 24 to 48 hours.</p>').fadeIn();
	});
}