import { mapToTemplate } from '../../../../../components/app/flask/snap-ui-renderer';
import { DelineatorType } from '../../../../../helpers/constants/flask';

function getValues(pendingApproval, t, actions) {
  const {
    snapName,
    requestData: { content },
  } = pendingApproval;
  const elementKeyIndex = { value: 0 };

  return {
    content: [
      {
        element: 'Box',
        key: 'snap-dialog-content-wrapper',
        props: {
          marginLeft: 4,
          marginRight: 4,
        },
        children: {
          element: 'SnapDelineator',
          key: 'snap-delineator',
          props: {
            type: DelineatorType.Content,
            snapName,
          },
          // TODO: Replace with SnapUIRenderer when we don't need to inject the input manually.
          children: mapToTemplate(content, elementKeyIndex),
        },
      },
    ],
    cancelText: t('reject'),
    submitText: t('approveButtonText'),
    onSubmit: () => actions.resolvePendingApproval(pendingApproval.id, true),
    onCancel: () => actions.resolvePendingApproval(pendingApproval.id, false),
  };
}

const snapConfirmation = {
  getValues,
};

export default snapConfirmation;
