// constructor
function ApiErrorCode() {
	// noop
}

// Parameter Required Errors
ApiErrorCode.EMAIL_ADDRESS_REQUIRED = 200;
ApiErrorCode.PASSWORD_REQUIRED = 201;
ApiErrorCode.FULL_NAME_REQUUIRED = 202;
ApiErrorCode.SKILLS_REQUIRED = 203;

// Parameter Invalid Errors
ApiErrorCode.INVALID_EMAIL_ADDRESS = 300;
ApiErrorCode.INVALID_PASSWORD = 301;
ApiErrorCode.INVALID_NOTIFY_FREQUENCY = 302;

// Logic Errors
ApiErrorCode.EMAIL_ADDRESS_ALREADY_USED = 400;
