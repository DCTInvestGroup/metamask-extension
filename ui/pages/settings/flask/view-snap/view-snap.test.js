import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { renderWithProvider } from '../../../../../test/lib/render-helpers';
import mockState from '../../../../../test/data/mock-state.json';
import ViewSnap from './view-snap';

jest.mock('../../../../store/actions.ts', () => {
  return {
    disableSnap: jest.fn(),
    enableSnap: jest.fn(),
    removeSnap: jest.fn(),
    removePermissionsFor: jest.fn(),
    updateCaveat: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn(() => ({
      pathname: `/settings/snaps-view/${encodeURIComponent(
        'npm:@metamask/test-snap-bip44',
      )}`,
    })),
  };
});

const mockStore = configureMockStore([thunk])(mockState);

describe('ViewSnap', () => {
  it('should properly display Snap View elements', async () => {
    const { getByText, container, getByRole } = renderWithProvider(
      <ViewSnap />,
      mockStore,
    );

    // Snap name & Snap authorship component
    expect(getByText('BIP-44 Test Snap')).toBeDefined();
    expect(container.getElementsByClassName('snaps-authorship')?.length).toBe(
      1,
    );
    // Snap description
    expect(
      getByText('An example Snap that signs messages using BLS.'),
    ).toBeDefined();
    // Snap version info
    expect(getByText('v5.1.2')).toBeDefined();
    // Enable Snap
    expect(getByText('Enable snap')).toBeDefined();
    expect(
      getByText(
        'Your installed snap will only have access to its permissions and run if it’s enabled.',
      ),
    ).toBeDefined();
    expect(container.getElementsByClassName('toggle-button')?.length).toBe(1);
    // Permissions
    expect(getByText('Permissions')).toBeDefined();
    expect(
      container.getElementsByClassName('snap-permissions-list')?.length,
    ).toBe(1);
    // Connected sites
    expect(getByText('Connected sites')).toBeDefined();
    expect(
      container.getElementsByClassName('connected-sites-list__content-rows')
        ?.length,
    ).toBe(1);
    // Remove snap
    expect(getByText('Remove snap')).toBeDefined();
    expect(
      getByText(
        'This action will delete the snap, its data and revoke your given permissions.',
      ),
    ).toBeDefined();
    expect(getByText('Remove BIP-44 Test Snap')).toBeDefined();
    expect(getByRole('button')).toHaveClass(
      'button btn--rounded btn-danger view-snap__remove-button',
    );
  });
});
