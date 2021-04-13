//global variables
let global_selectedCustomer = 0;
let global_nextID = 0;

$(document).ready(function () {
    //hide customer form
    $("#customer-form").hide();

    //populate table
    customerList();

    //On edit button click listener
    $(document).on('click', '.editButton', editCustomer);

    //On add button click listener
    $("#addButton").click(function () {
        $("#customer-form").slideDown();
        $("#addButton").hide();
        $("#delete-button").hide();
        $("#update-button").hide();
        $("#submit-button").show();
    })

    //On back button click listener
    $("#back-button").click(function () {
        $("#customer-form").slideUp();
        $("#addButton").show();
        $('#errorWarning').text("");
        formClear();
    })

    //On submit button click listener
    $("#submit-button").click(function () {
        var errors = validate();
        
        if (errors > 0) {
            $('#errorWarning').text("All fields are required");
            return false;
        } else {
            $("#customer-form").slideUp();
            $("#addButton").show();
            addCustomer();
            formClear();
        }
    })

    //On delete button click listener
    $("#delete-button").click(function () {
        $("#customer-form").slideUp();
        $("#addButton").show();
        deleteCustomer(global_selectedCustomer);
        formClear();
    })

    //On update button click listener
    $("#update-button").click(function () {
        var errors = validate();

        if (errors > 0) {
            $('#errorWarning').text("All fields are required");
            return false;
        } else {
            $("#customer-form").slideUp();
            $("#addButton").show();
            updateCustomer(global_selectedCustomer);
            formClear();
        }
    })

    

});

//ajax call to get customers from db
function customerList() {
    $.ajax({
        url: '/api/Customers/getCustomers',
        type: 'GET',
        dataType: 'json',
        success: function (customers) {
            customerListSuccess(customers);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

//if ajax call successfull add rows
function customerListSuccess(customers) {
    $.each(customers, function (index, customer) {
        customerAddRow(customer);
    });
}

//append rows to table and checking if table has tbody to populate to
function customerAddRow(customer) {
    if ($("#customerTable tbody").length == 0) {
        $("#customerTable").append("<tbody></tbody>");
    }
    $("#customerTable tbody").append(customerBuildTableRow(customer));
}

//builds html rows to append to table
function customerBuildTableRow(customer) {
    let row =
        "<tr id=row" + customer.CustomerID +" >" +
            "<td>" + customer.CustomerID + "</td>" +
            "<td>" + customer.Name + "</td>" +
            "<td>" + customer.Address + "</td>" +
            "<td>" + customer.City + "</td>" +
            "<td>" + customer.State + "</td>" +
            "<td>" + customer.Zip + "</td>" +
            "<td>" +
                "<button type = 'button' " +
                "class = editButton " +
                "id = row" + customer.CustomerID + " " +
                "class='btn btn-default' >" +
                "<span class ='glyphicon glyphicon-edit' />" +
                "</button>" +
            "</td>" +
        "</tr>";
    return row;
}

//exception handler
function handleException(request, message, error) {
    let msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message: " + request.responseJSON.message + "\n";
    }
    alert(msg);
}

//edit button function call
function editCustomer() {
    let $row = jQuery(this).closest('tr');
    let $columns = $row.find('td');

    $("#addButton").hide();
    $("#customer-form").slideDown();
    $("#back-button").show();
    $("#update-button").show();
    $("#delete-button").show();
    $("#submit-button").hide();

    global_selectedCustomer = $columns[0].innerHTML;

    $("#input-name").val($columns[1].innerHTML);
    $("#input-address").val($columns[2].innerHTML);
    $("#input-city").val($columns[3].innerHTML);
    $("#input-state").val($columns[4].innerHTML);
    $("#input-zip").val($columns[5].innerHTML);
}

//add button function call
function addCustomer() {

    let customer = {
        CustomerID: 1,
        Name: $("#input-name").val(),
        Address: $("#input-address").val(),
        City: $("#input-city").val(),
        State: $("#input-state").val(),
        Zip: $("#input-zip").val()
    }

    $.ajax({
        url: '/api/Customers/addCustomer',
        type: 'POST',
        contentType:
            "application/json;charset=utf-8",
        data: JSON.stringify(customer),
        success: function (customer) {
            customerAddSuccess(customer);
            console.log(customer);
            console.log('success');
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

//on customer add success, function appends new row to table
function customerAddSuccess(customer) {
    customerAddRow(customer);
    formClear();
}

//update button function call
function updateCustomer(CustomerID) {

    let customer = {
        CustomerID: CustomerID,
        Name: $("#input-name").val(),
        Address: $("#input-address").val(),
        City: $("#input-city").val(),
        State: $("#input-state").val(),
        Zip: $("#input-zip").val()
    }

    $.ajax({
        url: '/api/Customers/updateCustomer',
        type: 'PUT',
        contentType:
            "application/json;charset=utf-8",
        data: JSON.stringify(customer),
        success: function () {
            customerUpdateSuccess(customer);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    })
}

//on customer update success, function updates row in table
function customerUpdateSuccess(customer) {
    let $row = $("#row" + customer.CustomerID);
    let $columns = $row.find('td');

    $columns[1].innerText = customer.Name;
    $columns[2].innerText = customer.Address;
    $columns[3].innerText = customer.City;
    $columns[4].innerText = customer.State;
    $columns[5].innerText = customer.Zip;
}

//delete button function call
function deleteCustomer(CustomerID) {

    let data = {
        CustomerID: CustomerID
    }

    $.ajax({
        url: '/api/Customers/deleteCustomer',
        type: 'DELETE',
        contentType:
            "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: function () {
            //removes row from customertable via id
            $("#row" + CustomerID).remove();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

//very simple validation
function validate() {
    var errors = 0;
    $('#form-row :input').map(function () {
        if ($.trim($(this).val()) == '') {
            $(this).addClass("error");
            errors++;
        } else if ($(this).val()) {
            $(this).removeClass("error");
        }
    });

    return errors;
}

// function to clears form
function formClear() {
    $("#input-name").val("");
    $("#input-address").val("");
    $("#input-city").val("");
    $("#input-state").val("");
    $("#input-zip").val("");

    $("#errorWarning").text("");

    $('#form-row :input').map(function () {
        $(this).removeClass("error");
    });
}
