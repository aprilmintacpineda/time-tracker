<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTasksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function withValidator($validator) {
        $validator->after(function($validator) {
            $tasks = $this->request->get('tasks');

            for($a = 0; $a < count($tasks); $a++) {
                $errors = [];

                // validating title
                if (!isset($tasks[$a]['title']) || empty($tasks[$a]['title'])) {
                    $errors['title'] = ['Title is required.'];
                } else if (strlen($tasks[$a]['title']) > 255) {
                    $errors['title'] = ['Title should not exceed 255 characters.'];
                }

                // validating description
                if (strlen($tasks[$a]['description']) > 255) {
                    $errors['description'] = ['Description should not exceed 255 characters.'];
                }

                // adding error message for this index
                if (count($errors)) {
                    $validator->errors()->add('task.'.$a, $errors);
                }
            }
        });
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
