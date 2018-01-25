let employees = [];

//Makes the first letter in a word big and returns the full word with a big first letter.
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Builds an li element for each object in the employees array containg basic
//information (name, email, city) and appends it to the employee-directory div
function addEmployeesToDirectory(employees) {
  let galleryHTML = '<ul class="directory">';
  $.each(employees, function(i, employee) {
    let firstName = capitalize(employee.name.first);
    let lastName = capitalize(employee.name.last);
    let city = capitalize(employee.location.city);
    galleryHTML += '<li id="' + i + '">';
    galleryHTML += '<a><img src="' + employee.picture.large + '"></a>';
    galleryHTML += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
    galleryHTML += employee.email + '<br>';
    galleryHTML += city + '</p></li>';
  });
  galleryHTML += '</ul>'
  $('.employee-directory').html(galleryHTML);
}

function employeeClickEventListener() {
   $('li').click(function() {
     let id = $(this).attr('id');
     let idNumber = parseInt(id, 10);
     displayEmployeeModal(idNumber);
   });
}

function displayEmployeeModal(index) {
  let employee = employees[index];
  let firstName = capitalize(employee.name.first);
  let lastName = capitalize(employee.name.last);
  let address = formatAddress(employee);
  let dob = formatDateOfBirth(employee.dob);
  let modalContent = '<div class="modal-content">';
  modalContent += '<span class="close">&times;</span>';
  modalContent += '<img src="' + employee.picture.large + '">';
  modalContent += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
  modalContent += '<br>' + employee.login.username + '<br>' + employee.email + '<br>';
  modalContent += '<br><hr><br>' + employee.cell + '<br><br>';
  modalContent += address + '<br>';
  modalContent += 'Birthday: ' + dob + '</p>';
  modalContent += '<span class="buttons">';
  modalContent += '</div>';
  $('#employee-modal').append(modalContent);
  $('.modal').css('display', 'block');
  addEventListenersToModal(index);
}

 //Takes the date of birth string from an eployees array object, parses it into
 //a date object to extract only the necessary information and then puts it back
 //into a string to be formatted. Returns formatted date string (mm/dd/yy)
function formatDateOfBirth(string) {
  let date = new Date(Date.parse(string));
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getYear();
  let dob = month + '/' + day + '/' + year;
  return dob;
}

//Takes the date of birth string from an eployees array object, parses it into
//date object to extract only the necessary information and then puts it back
//into a string to be formatted. Returns formatted date string (mm/dd/yy)
function formatAddress(employee) {
  let city = capitalize(employee.location.city);
  let state = capitalize(employee.location.state);
  let address = employee.location.street + '<br>'
  address += city + ', ' + state;
  address += ' ' + employee.location.postcode + ', ';
  address += employee.nat + '<br>';
  return address;
}

//object referenced in the modal. Close listener closes the modal when an x
function addEventListenersToModal(idNumber) {
  // close button listener
  $('.close').click(function() {
    $('.modal').css('display', 'none');
    $('.modal-content').remove();
  });
}

//Takes the input from the searcbar and searches employee names and emails for
//the searchTerm. Hides all employees and shows those that match searchterm.
function searchEmployees(input) {
  let searchTerm = input.toLowerCase();
  let $employees = $('p:contains(' + searchTerm + ')').closest('li');
  $('li').hide();
  $employees.show();
}

// searchbar keyup event listener
$('#search').keyup(function() {
  let searchTerm = $('#search').val()
  searchEmployees(searchTerm);
});

// Gets 12 employees from the randomUser API, call addEmployees and addEvent Listener functions
$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us',
	dataType: 'json',
	success: function(data) {
		employees = data.results;
		addEmployeesToDirectory(employees);
		employeeClickEventListener();
	}
});