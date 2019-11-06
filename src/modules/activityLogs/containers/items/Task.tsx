import gql from 'graphql-tag';
import Task from 'modules/activityLogs/components/items/Task';
import Spinner from 'modules/common/components/Spinner';
import { withProps } from 'modules/common/utils';
import { queries as taskQueries } from 'modules/tasks/graphql';
import { TaskDetailQueryResponse } from 'modules/tasks/types';
import React from 'react';
import { compose, graphql } from 'react-apollo';

type Props = {
  activity: any;
  taskId: string;
};

type FinalProps = {
  taskDetailsQuery: TaskDetailQueryResponse;
} & Props;

class FormContainer extends React.Component<FinalProps> {
  render() {
    const { taskDetailsQuery } = this.props;

    if (taskDetailsQuery.loading) {
      return <Spinner />;
    }

    const task = taskDetailsQuery.taskDetail;

    const updatedProps = {
      ...this.props,
      task
    };

    return <Task {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, TaskDetailQueryResponse>(gql(taskQueries.taskDetail), {
      name: 'taskDetailsQuery',
      options: ({ taskId }) => ({
        variables: {
          _id: taskId
        }
      })
    })
  )(FormContainer)
);
