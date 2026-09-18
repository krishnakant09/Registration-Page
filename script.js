/**
 * Interactive Form Validation System
 * Rigorous client-side validation using Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('registrationForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitSpinner = document.getElementById('submitSpinner');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnArrow = submitBtn.querySelector('.btn-arrow');

  // Input Fields & Groups
  const nameInput = document.getElementById('fullName');
  const nameGroup = document.getElementById('nameGroup');
  const nameError = document.getElementById('nameError');

  const emailInput = document.getElementById('email');
  const emailGroup = document.getElementById('emailGroup');
  const emailError = document.getElementById('emailError');

  const phoneInput = document.getElementById('phone');
  const phoneGroup = document.getElementById('phoneGroup');
  const phoneError = document.getElementById('phoneError');
  const phoneCounter = document.getElementById('phoneCounter');

  const passwordInput = document.getElementById('password');
  const passwordGroup = document.getElementById('passwordGroup');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const eyeIconShow = document.getElementById('eyeIconShow');
  const eyeIconHide = document.getElementById('eyeIconHide');
  const strengthBar = document.getElementById('strengthBar');
  const strengthRating = document.getElementById('strengthRating');

  // Password Checklist Criteria Elements
  const critLength = document.getElementById('critLength');
  const critLower = document.getElementById('critLower');
  const critUpper = document.getElementById('critUpper');
  const critNumber = document.getElementById('critNumber');
  const critSymbol = document.getElementById('critSymbol');

  // Modal Elements
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const submittedName = document.getElementById('submittedName');
  const submittedEmail = document.getElementById('submittedEmail');
  const submittedPhone = document.getElementById('submittedPhone');

  // Track field touch states for optimal UX
  const touched = {
    fullName: false,
    email: false,
    phone: false,
    password: false
  };

  // --- Validation Helper Functions ---

  /**
   * Set field visual state to Invalid with error message
   */
  function setInvalid(input, group, errorEl, message, triggerShake = false) {
    group.classList.remove('is-valid');
    group.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;

    if (triggerShake) {
      const container = group.querySelector('.input-container');
      if (container) {
        container.classList.remove('shake-element');
        // Force reflow to restart animation
        void container.offsetWidth;
        container.classList.add('shake-element');
      }
    }
  }

  /**
   * Set field visual state to Valid
   */
  function setValid(input, group, errorEl) {
    group.classList.remove('is-invalid');
    group.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
  }

  /**
   * Reset field state
   */
  function resetField(input, group, errorEl) {
    group.classList.remove('is-invalid', 'is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
  }

  // --- Validator Logic for Each Field ---

  /**
   * Validate Full Name
   * Rules: Non-empty, min 3 characters, max 50 characters, only letters, spaces, hyphens, and apostrophes
   */
  function validateName(triggerShake = false) {
    const value = nameInput.value.trim();

    if (value === '') {
      setInvalid(nameInput, nameGroup, nameError, 'Full Name is required.', triggerShake);
      return false;
    }

    if (value.length < 3) {
      setInvalid(nameInput, nameGroup, nameError, 'Full Name must be at least 3 characters long.', triggerShake);
      return false;
    }

    if (value.length > 50) {
      setInvalid(nameInput, nameGroup, nameError, 'Full Name cannot exceed 50 characters.', triggerShake);
      return false;
    }

    // Name regex: alphabetic characters with optional spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(value)) {
      setInvalid(nameInput, nameGroup, nameError, 'Full Name can only contain letters, spaces, and hyphens.', triggerShake);
      return false;
    }

    setValid(nameInput, nameGroup, nameError);
    return true;
  }

  /**
   * Validate Email Address
   * Rules: Non-empty, conforms to standard email format with valid domain extension
   */
  function validateEmail(triggerShake = false) {
    const value = emailInput.value.trim();

    if (value === '') {
      setInvalid(emailInput, emailGroup, emailError, 'Email address is required.', triggerShake);
      return false;
    }

    // Standard robust email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setInvalid(emailInput, emailGroup, emailError, 'Please enter a valid email address (e.g., name@domain.com).', triggerShake);
      return false;
    }

    setValid(emailInput, emailGroup, emailError);
    return true;
  }

  /**
   * Validate Phone Number
   * Rules: Non-empty, strictly 10 digits
   */
  function validatePhone(triggerShake = false) {
    const rawValue = phoneInput.value;
    // Strip non-digits automatically and limit to 10 digits
    const cleaned = rawValue.replace(/\D/g, '').slice(0, 10);
    if (rawValue !== cleaned) {
      phoneInput.value = cleaned;
    }

    // Update digit counter badge
    phoneCounter.textContent = `${cleaned.length}/10`;
    if (cleaned.length === 10) {
      phoneCounter.classList.add('complete');
    } else {
      phoneCounter.classList.remove('complete');
    }

    if (cleaned === '') {
      setInvalid(phoneInput, phoneGroup, phoneError, 'Phone number is required.', triggerShake);
      return false;
    }

    if (cleaned.length < 10) {
      setInvalid(phoneInput, phoneGroup, phoneError, `Phone number must be exactly 10 digits (entered ${cleaned.length}/10).`, triggerShake);
      return false;
    }

    if (!/^\d{10}$/.test(cleaned)) {
      setInvalid(phoneInput, phoneGroup, phoneError, 'Phone number must contain exactly 10 numeric digits.', triggerShake);
      return false;
    }

    setValid(phoneInput, phoneGroup, phoneError);
    return true;
  }

  /**
   * Evaluate Password Criteria and Strength
   * Checks length, lowercase, uppercase, number, symbol
   */
  function evaluatePasswordCriteria(value) {
    const hasMinLength = value.length >= 8;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(value);

    // Update individual checklist items
    updateCriteriaItem(critLength, hasMinLength);
    updateCriteriaItem(critLower, hasLower);
    updateCriteriaItem(critUpper, hasUpper);
    updateCriteriaItem(critNumber, hasNumber);
    updateCriteriaItem(critSymbol, hasSymbol);

    // Calculate score (0 to 5)
    let score = 0;
    if (hasMinLength) score++;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    // Update strength meter UI
    strengthBar.className = 'strength-meter-bar';
    strengthRating.className = 'strength-rating';

    if (value.length === 0) {
      strengthBar.style.width = '0%';
      strengthRating.textContent = 'None';
    } else if (score <= 2) {
      strengthBar.classList.add('weak');
      strengthRating.classList.add('weak');
      strengthRating.textContent = 'Weak';
    } else if (score === 3) {
      strengthBar.classList.add('fair');
      strengthRating.classList.add('fair');
      strengthRating.textContent = 'Fair';
    } else if (score === 4) {
      strengthBar.classList.add('good');
      strengthRating.classList.add('good');
      strengthRating.textContent = 'Good';
    } else if (score === 5) {
      strengthBar.classList.add('strong');
      strengthRating.classList.add('strong');
      strengthRating.textContent = 'Strong';
    }

    return {
      allMet: score === 5,
      hasMinLength,
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      score
    };
  }

  function updateCriteriaItem(el, isMet) {
    const icon = el.querySelector('.criteria-icon');
    if (isMet) {
      el.classList.add('met');
      icon.innerHTML = '&#10003;'; // Checkmark
    } else {
      el.classList.remove('met');
      icon.innerHTML = '&#10005;'; // Cross
    }
  }

  /**
   * Validate Password
   * Rules: Non-empty, meets all 5 security criteria
   */
  function validatePassword(triggerShake = false) {
    const value = passwordInput.value;
    const { allMet } = evaluatePasswordCriteria(value);

    if (value === '') {
      setInvalid(passwordInput, passwordGroup, passwordError, 'Password is required.', triggerShake);
      return false;
    }

    if (!allMet) {
      setInvalid(passwordInput, passwordGroup, passwordError, 'Password must satisfy all 5 requirements above.', triggerShake);
      return false;
    }

    setValid(passwordInput, passwordGroup, passwordError);
    return true;
  }

  // --- Real-Time Event Listeners ---

  // Full Name Live Listeners
  nameInput.addEventListener('input', () => {
    if (touched.fullName) {
      validateName(false);
    }
  });

  nameInput.addEventListener('blur', () => {
    touched.fullName = true;
    validateName(false);
  });

  // Email Live Listeners
  emailInput.addEventListener('input', () => {
    if (touched.email) {
      validateEmail(false);
    }
  });

  emailInput.addEventListener('blur', () => {
    touched.email = true;
    validateEmail(false);
  });

  // Phone Live Listeners
  phoneInput.addEventListener('input', () => {
    // Real-time counter and filter happens on every stroke
    validatePhone(false);
  });

  phoneInput.addEventListener('blur', () => {
    touched.phone = true;
    validatePhone(false);
  });

  // Password Live Listeners
  passwordInput.addEventListener('input', () => {
    // Strength meter and checklist update immediately
    evaluatePasswordCriteria(passwordInput.value);
    if (touched.password) {
      validatePassword(false);
    }
  });

  passwordInput.addEventListener('blur', () => {
    touched.password = true;
    validatePassword(false);
  });

  // Password Visibility Toggle
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    if (isPassword) {
      eyeIconShow.classList.add('hidden');
      eyeIconHide.classList.remove('hidden');
      togglePasswordBtn.setAttribute('aria-label', 'Hide password');
      togglePasswordBtn.setAttribute('title', 'Hide password');
    } else {
      eyeIconShow.classList.remove('hidden');
      eyeIconHide.classList.add('hidden');
      togglePasswordBtn.setAttribute('aria-label', 'Show password');
      togglePasswordBtn.setAttribute('title', 'Show password');
    }
  });

  // --- Form Submission Handler ---

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mark all fields as touched
    touched.fullName = true;
    touched.email = true;
    touched.phone = true;
    touched.password = true;

    // Run validation across all fields
    const isNameValid = validateName(true);
    const isEmailValid = validateEmail(true);
    const isPhoneValid = validatePhone(true);
    const isPasswordValid = validatePassword(true);

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid;

    if (!isFormValid) {
      // Focus on the first invalid field
      if (!isNameValid) {
        nameInput.focus();
      } else if (!isEmailValid) {
        emailInput.focus();
      } else if (!isPhoneValid) {
        phoneInput.focus();
      } else if (!isPasswordValid) {
        passwordInput.focus();
      }
      return;
    }

    // All validation passed - trigger simulated secure submission
    submitBtn.disabled = true;
    btnText.textContent = 'Validating & Submitting...';
    btnArrow.classList.add('hidden');
    submitSpinner.classList.remove('hidden');

    setTimeout(() => {
      // Populate success modal details
      submittedName.textContent = nameInput.value.trim();
      submittedEmail.textContent = emailInput.value.trim();
      // Mask phone number for privacy: e.g. "******3210"
      const phoneVal = phoneInput.value.trim();
      submittedPhone.textContent = phoneVal ? `******${phoneVal.slice(-4)}` : '-';

      // Show celebratory modal
      successModal.classList.remove('hidden');

      // Reset button state
      submitBtn.disabled = false;
      btnText.textContent = 'Create Account';
      btnArrow.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    }, 600);
  });

  // Close Success Modal & Reset Form
  closeModalBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    form.reset();

    // Reset touch state
    touched.fullName = false;
    touched.email = false;
    touched.phone = false;
    touched.password = false;

    // Reset visual styles
    resetField(nameInput, nameGroup, nameError);
    resetField(emailInput, emailGroup, emailError);
    resetField(phoneInput, phoneGroup, phoneError);
    resetField(passwordInput, passwordGroup, passwordError);

    // Reset counter & criteria
    phoneCounter.textContent = '0/10';
    phoneCounter.classList.remove('complete');
    evaluatePasswordCriteria('');

    nameInput.focus();
  });

  // Close modal when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
      closeModalBtn.click();
    }
  });
});
