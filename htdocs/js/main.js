
$(function(){
	//mijn variables waarmee ik mijn inputvelden aanroep.
var $data = $('#data');
var $naam = $('#naam');
var $voornaam = $('#voornaam');
var $straat = $('#straat');
var $adres = $('#adres');
var $mail = $('#mail');
var $gsm = $('#gsm');


//mijn get methode.
$.ajax({
  type: 'GET',
  url: 'https://beaid.cloudant.com/databank/_design/leden/_view/leden',
  success: function(data){
    var data = data.rows
    $.each(data,function(i,persoon){
      console.log(persoon)
			$('#ledenTable').append('<tr leedid='+persoon.id+'?rev='+persoon.value._rev+'><td><span class="noedit naam">'+persoon.value.naam+'</span><input class="form-control edit naam" type="text" readonly/></td><td><span class="noedit voornaam">'+persoon.value.voornaam+'</span><input class="edit form-control voornaam" type="text" readonly/></td><td><span class="noedit straat">'+persoon.value.straat+'</span><input class="edit form-control straat" type="text"></td><td><span class="noedit adres">'+persoon.value.adres+'</span><input class="edit form-control adres" type="text"></td><td><span class="noedit mail">'+persoon.value.mail+'</span><input class="edit form-control mail" type="email"/></td><td><span class="noedit gsm">'+persoon.value.gsm+'</span><input class="edit form-control gsm" type="text"/></td><td><button class="btn btn-danger remove noedit" leedid='+persoon.id+'?rev='+persoon.value._rev+'>x</button><button class="btn btn-success saveEdit edit">Save</button></td><td><button class="btn btn-primary editLeden noedit">Edit</button><button class="btn btn-warning cancelEdit edit">Cancel</button></td></tr>');
    });
  },
	error: function(){
			alert('fout bij het ophalen');
	}
});

// Mijn post methode.
	$('#voegToe').on('click',function(){

		var leden = {
			_id :$naam.val()+$voornaam.val(),
			naam : $naam.val(),
			voornaam: $voornaam.val(),
      straat: $straat.val(),
			adres: $adres.val(),
			mail : $mail.val(),
			gsm : $gsm.val(),
		};

		$.ajax({
			type: 'POST',
			url : 'https://beaid.cloudant.com/databank/',
			data: JSON.stringify(leden),
			contentType:'application/json',
			async:true,
			success: function(){
				location.reload(true);
			},
			error:function(){
				alert('fout bij het posten');
			}

		});

	});



// mijn delete methode.
 $("#ledenTable").delegate('.remove','click',function() {
	 	var $tr = $(this).closest('tr');
		$.ajax({
			type:'DELETE',
			url: 'https://beaid.cloudant.com/databank/'+$(this).attr('leedid'),
			success: function(){
				$tr.fadeOut(300,function(){
					$(this).remove();
				});
			},
			error :function(){
				alert("fout bij deleten")

			}

		});
 })

$("#ledenTable").delegate('.editLeden','click',function(){
    console.log("okey");
	   var $tr = $(this).closest('tr');

  $tr.find('input.naam').val($tr.find('span.naam').html());
	$tr.find('input.voornaam').val($tr.find('span.voornaam').html());
  $tr.find('input.straat').val($tr.find('span.straat').html());
	$tr.find('input.adres').val($tr.find('span.adres').html());
	$tr.find('input.mail').val($tr.find('span.mail').html());
	$tr.find('input.gsm').val($tr.find('span.gsm').html());
	$tr.addClass('edit');
});

$("#ledenTable").delegate('.cancelEdit','click',function(){
	$(this).closest('tr').removeClass('edit');
})

$("#ledenTable").delegate('.saveEdit','click',function(){
 var $tr= $(this).closest('tr');
 var $table=$(this).closest('table')
	var leden = {
		naam : $tr.find('input.naam').val(),
		voornaam: $tr.find('input.voornaam').val(),
    straat: $tr.find('input.straat').val(),
		adres: $tr.find('input.adres').val(),
		mail : $tr.find('input.mail').val(),
		gsm : $tr.find('input.gsm').val(),
	};

	$.ajax({
		type: 'PUT',
		url : 'https://beaid.cloudant.com/databank/'+$tr.attr('leedid'),
		data: JSON.stringify(leden),
		contentType:'application/json',
		async:true,
		success: function(){
      console.log(leden);
			$tr.find('span.naam').html(leden.naam);
			$tr.find('span.voornaam').html(leden.voornaam);
      $tr.find('span.straat').html(leden.straat);
			$tr.find('span.adres').html(leden.adres);
			$tr.find('span.mail').html(leden.mail);
			$tr.find('span.gsm').html(leden.gsm);
			$tr.removeClass('edit');
			location.reload(true);
		},
		error:function(){
			alert('fout bij het posten');
		}

	});

});
});
$('#ikzoek').keydown(function() {
  $('.filter').multifilter()
});
