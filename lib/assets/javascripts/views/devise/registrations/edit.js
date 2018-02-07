import ariatiseForm from '../../../utils/ariatiseForm';
import { isObject, isString } from '../../../utils/isType';
import { isValidPassword } from '../../../utils/isValidInputType';
import { addMatchingPasswordValidator, togglisePasswords } from '../../../utils/passwordHelper';

$(() => {
  ariatiseForm({ selector: '#personal_details_registration_form' });
  ariatiseForm({ selector: '#password_details_registration_form' });
  ariatiseForm({ selector: '#preferences_registration_form' });
  addMatchingPasswordValidator({ selector: '#password_details_registration_form' });
  togglisePasswords({ selector: '#password_details_registration_form' });

  // If the user has changed their email address display the password
  // confirmation modal on form submission
  $('#personal_details_registration_form [type="submit"]').click((e) => {
    const newEmail = $('#personal_details_registration_form #user_email');
    if (isObject($('#original_email')) && isObject($(newEmail))) {
      const original = $('#original_email').val();
      const email = $(newEmail).val();
      const pwd = $('#password-confirmation input[name="user[current_password]"]').val();

      // If the user changed the email and has not confirmed their password
      if (isString(original) && isString(email)) {
        if ((original.toLowerCase() !== email.toLowerCase()) && !isValidPassword(pwd)) {
          e.preventDefault();
          $('#password-confirmation').modal('show');
        }
      }
    }
  });

  // Devise seems to require both the password and current_password so sync them
  // when the user enters their password in the modal
  $('#password-confirmation input[name="user[current_password]"]').change((e) => {
    $('#password-confirmation #user_password').val($(e.target).val());
  });

  // Submit the form when the user clicks the confirmation button on the modal
  $('#pwd-confirmation').click((e) => {
    $(e.target).closest('form').submit();
  });
});