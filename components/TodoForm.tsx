import React, { FC } from 'react';
import { Button, Form } from '@douyinfe/semi-ui';

import { Todo } from '@models/todo';

const TodoForm: FC<{ onChange: (todo: Todo) => void }> = ({ onChange }) => {
  return (
    <div className="w-96 p-4 bg-white rounded shadow-md">
      <Form onSubmit={(values) => onChange(values as Todo)}>
        <Form.Input field="title" label="标题" style={{ width: '100%' }} />
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
