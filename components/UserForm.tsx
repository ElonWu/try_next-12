import React, { FC } from 'react';
import { Button, Form } from '@douyinfe/semi-ui';

import { User } from '@models/user';

const UserForm: FC<{ onChange: (user: User) => void }> = ({ onChange }) => {
  return (
    <div className="w-96 p-4 bg-white rounded shadow-md">
      <Form onSubmit={(values) => onChange(values as User)}>
        <Form.Input field="name" label="用户名" style={{ width: '100%' }} />
        <Form.InputNumber
          field="age"
          label={{ text: '年龄' }}
          style={{ width: '100%' }}
        />

        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
