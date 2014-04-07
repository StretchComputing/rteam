// constructor
function ApiErrorCode() {
	// noop
}

// Parameter Required Errors
ApiErrorCode.NAME_REQUIRED = 200;
ApiErrorCode.BASE64_IMAGE_REQUIRED = 201;
ApiErrorCode.DEVICE_SIGNATURE_REQUIRED = 202;
ApiErrorCode.VOICE_SIGNATURE_ID_REQUIRED = 203;
ApiErrorCode.SKILL_REQUIRED = 204;
ApiErrorCode.NOTIFICATION_FREQUENCY_REQUIRED = 204;

// Parameter Invalid Errors
ApiErrorCode.INVALID_BASE64_IMAGE = 300;
ApiErrorCode.INVALID_DEVICE_SIGNATURE = 301;
ApiErrorCode.INVALID_VOICE_SIGNATURE_ID = 302;
ApiErrorCode.INVALID_NOTIFICATION_FREQUENCY = 303;

// Logic Errors
ApiErrorCode.NAME_ALREADY_USED = 400;
