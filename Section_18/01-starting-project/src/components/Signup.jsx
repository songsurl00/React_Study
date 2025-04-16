import { useActionState } from 'react';

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue
} from '../util/validation';

const signupAction = (prevFormState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const terms = formData.get('terms');
  const acquisition = formData.getAll('acquisition');

  let errors = [];

  if (!isEmail(email)) {
    errors.push('유효하지 않은 이메일 주소입니다.');
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push('비밀번호를 6자리 이상이어야 합니다.');
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    err;
    ors.push('비밀번호가 일치하지 않습니다.');
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push('성과 이름을 입력해주세요');
  }

  if (!isNotEmpty(role)) {
    errors.push('역할을 입력해주세요');
  }

  if (!terms) {
    errors.push('약관에 동의해주셔야 합니다');
  }

  if (acquisition.length === 0) {
    errors.push('최소 하나를 선택해주셔야 합니다.');
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisition,
        terms
      }
    };
  }

  return { errors: null };
};

export default function Signup() {
  const [formState, formAction, pending] = useActionState(signupAction, {
    errors: null
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            name='first-name'
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            name='last-name'
            defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select
          id='role'
          name='role'
          defaultValue={formState.enteredValues?.role}
        >
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
            defaultChecked={formState.enteredValues?.acquisition.includes(
              'google'
            )}
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
            defaultChecked={formState.enteredValues?.acquisition.includes(
              'friend'
            )}
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='other'
            name='acquisition'
            value='other'
            defaultChecked={formState.enteredValues?.acquisition.includes(
              'other'
            )}
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className='error'>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button className='button'>Sign up</button>
      </p>
    </form>
  );
}
