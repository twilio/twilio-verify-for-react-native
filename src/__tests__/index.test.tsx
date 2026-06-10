jest.mock('react-native', () => ({
  NativeModules: {
    RNTwilioVerify: {
      configure: jest.fn(),
      createFactor: jest.fn(),
      verifyFactor: jest.fn(),
      updateFactor: jest.fn(),
      getAllFactors: jest.fn(),
      deleteFactor: jest.fn(),
      getChallenge: jest.fn(),
      getAllChallenges: jest.fn(),
      updateChallenge: jest.fn(),
      clearLocalStorage: jest.fn(),
      isAvailable: jest.fn(),
    },
  },
}));

import { NativeModules } from 'react-native';
import { KeychainQueryMode } from '../TwilioVerifyType';
import TwilioVerify from '../index';

const {
  configure: mockConfigure,
  createFactor: mockCreateFactor,
  verifyFactor: mockVerifyFactor,
  updateFactor: mockUpdateFactor,
  getAllFactors: mockGetAllFactors,
  deleteFactor: mockDeleteFactor,
  getChallenge: mockGetChallenge,
  getAllChallenges: mockGetAllChallenges,
  updateChallenge: mockUpdateChallenge,
  clearLocalStorage: mockClearLocalStorage,
  isAvailable: mockIsAvailable,
} = NativeModules.RNTwilioVerify as {
  configure: jest.Mock;
  createFactor: jest.Mock;
  verifyFactor: jest.Mock;
  updateFactor: jest.Mock;
  getAllFactors: jest.Mock;
  deleteFactor: jest.Mock;
  getChallenge: jest.Mock;
  getAllChallenges: jest.Mock;
  updateChallenge: jest.Mock;
  clearLocalStorage: jest.Mock;
  isAvailable: jest.Mock;
};
import { PushFactorPayload } from '../models/PushFactorPayload';
import { VerifyPushFactorPayload } from '../models/VerifyPushFactorPayload';
import { UpdatePushFactorPayload } from '../models/UpdatePushFactorPayload';
import {
  ChallengeListPayload,
  ChallengeListOrder,
} from '../models/ChallengeListPayload';
import { UpdatePushChallengePayload } from '../models/UpdatePushChallengePayload';
import { ChallengeStatus } from '../models/Challenge';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('KeychainQueryMode', () => {
  it('should have correct enum values', () => {
    expect(KeychainQueryMode.Strict).toBe('strict');
    expect(KeychainQueryMode.Legacy).toBe('legacy');
  });
});

describe('TwilioVerify.configure', () => {
  it('should call native configure with keychainQueryMode strict', async () => {
    mockConfigure.mockResolvedValue(undefined);

    await TwilioVerify.configure({
      keychainQueryMode: KeychainQueryMode.Strict,
    });

    expect(mockConfigure).toHaveBeenCalledWith({
      keychainQueryMode: 'strict',
    });
  });

  it('should call native configure with keychainQueryMode legacy', async () => {
    mockConfigure.mockResolvedValue(undefined);

    await TwilioVerify.configure({
      keychainQueryMode: KeychainQueryMode.Legacy,
    });

    expect(mockConfigure).toHaveBeenCalledWith({
      keychainQueryMode: 'legacy',
    });
  });

  it('should call native configure with empty options', async () => {
    mockConfigure.mockResolvedValue(undefined);

    await TwilioVerify.configure({});

    expect(mockConfigure).toHaveBeenCalledWith({});
  });

  it('should reject when SDK is already initialized', async () => {
    mockConfigure.mockRejectedValue(
      new Error(
        'TwilioVerify SDK has already been initialized. configure() must be called before any other SDK method.'
      )
    );

    await expect(
      TwilioVerify.configure({ keychainQueryMode: KeychainQueryMode.Strict })
    ).rejects.toThrow('already been initialized');
  });
});

describe('TwilioVerify.createFactor', () => {
  const payload = new PushFactorPayload(
    'Test Device',
    'VA1234567890',
    'user-identity',
    'access-token',
    'push-token'
  );

  it('should call native createFactor and return factor', async () => {
    const mockFactor = {
      sid: 'YF1234567890',
      friendlyName: 'Test Device',
      accountSid: 'AC1234567890',
      serviceSid: 'VA1234567890',
      identity: 'user-identity',
      status: 'unverified',
      type: 'push',
      createdAt: '2024-01-01T00:00:00Z',
    };
    mockCreateFactor.mockResolvedValue(mockFactor);

    const result = await TwilioVerify.createFactor(payload);

    expect(mockCreateFactor).toHaveBeenCalledWith(payload);
    expect(result.sid).toBe('YF1234567890');
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockCreateFactor.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.createFactor(payload)).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.verifyFactor', () => {
  const payload = new VerifyPushFactorPayload('YF1234567890');

  it('should call native verifyFactor and return factor', async () => {
    const mockFactor = {
      sid: 'YF1234567890',
      friendlyName: 'Test Device',
      accountSid: 'AC1234567890',
      serviceSid: 'VA1234567890',
      identity: 'user-identity',
      status: 'verified',
      type: 'push',
      createdAt: '2024-01-01T00:00:00Z',
    };
    mockVerifyFactor.mockResolvedValue(mockFactor);

    const result = await TwilioVerify.verifyFactor(payload);

    expect(mockVerifyFactor).toHaveBeenCalledWith(payload);
    expect(result.status).toBe('verified');
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockVerifyFactor.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.verifyFactor(payload)).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.updateFactor', () => {
  const payload = new UpdatePushFactorPayload('YF1234567890', 'new-push-token');

  it('should call native updateFactor and return factor', async () => {
    const mockFactor = {
      sid: 'YF1234567890',
      friendlyName: 'Test Device',
      accountSid: 'AC1234567890',
      serviceSid: 'VA1234567890',
      identity: 'user-identity',
      status: 'verified',
      type: 'push',
      createdAt: '2024-01-01T00:00:00Z',
    };
    mockUpdateFactor.mockResolvedValue(mockFactor);

    const result = await TwilioVerify.updateFactor(payload);

    expect(mockUpdateFactor).toHaveBeenCalledWith(payload);
    expect(result.sid).toBe('YF1234567890');
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockUpdateFactor.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.updateFactor(payload)).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.getAllFactors', () => {
  it('should call native getAllFactors and return array', async () => {
    const mockFactors = [
      {
        sid: 'YF1234567890',
        friendlyName: 'Test Device',
        accountSid: 'AC1234567890',
        serviceSid: 'VA1234567890',
        identity: 'user-identity',
        status: 'verified',
        type: 'push',
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];
    mockGetAllFactors.mockResolvedValue(mockFactors);

    const result = await TwilioVerify.getAllFactors();

    expect(mockGetAllFactors).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockGetAllFactors.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.getAllFactors()).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.deleteFactor', () => {
  it('should call native deleteFactor with sid', async () => {
    mockDeleteFactor.mockResolvedValue(undefined);

    await TwilioVerify.deleteFactor('YF1234567890');

    expect(mockDeleteFactor).toHaveBeenCalledWith('YF1234567890');
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockDeleteFactor.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(
      TwilioVerify.deleteFactor('YF1234567890')
    ).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.getChallenge', () => {
  it('should call native getChallenge and return challenge', async () => {
    const mockChallenge = {
      sid: 'YC1234567890',
      factorSid: 'YF1234567890',
      status: 'pending',
      challengeDetails: { message: 'Login request', fields: [] },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      expirationDate: '2024-01-01T01:00:00Z',
    };
    mockGetChallenge.mockResolvedValue(mockChallenge);

    const result = await TwilioVerify.getChallenge(
      'YC1234567890',
      'YF1234567890'
    );

    expect(mockGetChallenge).toHaveBeenCalledWith(
      'YC1234567890',
      'YF1234567890'
    );
    expect(result.sid).toBe('YC1234567890');
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockGetChallenge.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(
      TwilioVerify.getChallenge('YC1234567890', 'YF1234567890')
    ).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.getAllChallenges', () => {
  const payload = new ChallengeListPayload(
    'YF1234567890',
    10,
    undefined,
    ChallengeListOrder.Desc
  );

  it('should call native getAllChallenges and return list', async () => {
    const mockChallengeList = {
      challenges: [],
      metadata: { page: 0, pageSize: 10 },
    };
    mockGetAllChallenges.mockResolvedValue(mockChallengeList);

    const result = await TwilioVerify.getAllChallenges(payload);

    expect(mockGetAllChallenges).toHaveBeenCalledWith(payload);
    expect(result.challenges).toHaveLength(0);
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockGetAllChallenges.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.getAllChallenges(payload)).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.updateChallenge', () => {
  const payload = new UpdatePushChallengePayload(
    'YF1234567890',
    'YC1234567890',
    ChallengeStatus.Approved
  );

  it('should call native updateChallenge', async () => {
    mockUpdateChallenge.mockResolvedValue(undefined);

    await TwilioVerify.updateChallenge(payload);

    expect(mockUpdateChallenge).toHaveBeenCalledWith(payload);
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockUpdateChallenge.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.updateChallenge(payload)).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.clearLocalStorage', () => {
  it('should call native clearLocalStorage', async () => {
    mockClearLocalStorage.mockResolvedValue(undefined);

    await TwilioVerify.clearLocalStorage();

    expect(mockClearLocalStorage).toHaveBeenCalled();
  });

  it('should reject with INIT_ERROR when SDK fails to initialize', async () => {
    mockClearLocalStorage.mockRejectedValue({
      code: 'INIT_ERROR',
      message: 'Failed to initialize TwilioVerify: Keychain access error',
    });

    await expect(TwilioVerify.clearLocalStorage()).rejects.toMatchObject({
      code: 'INIT_ERROR',
    });
  });
});

describe('TwilioVerify.isAvailable', () => {
  it('should return true when SDK initializes successfully', async () => {
    mockIsAvailable.mockResolvedValue(true);

    const result = await TwilioVerify.isAvailable();

    expect(result).toBe(true);
  });

  it('should return false when SDK fails to initialize', async () => {
    mockIsAvailable.mockResolvedValue(false);

    const result = await TwilioVerify.isAvailable();

    expect(result).toBe(false);
  });
});

describe('configure then SDK operation flow', () => {
  it('should allow configure before createFactor', async () => {
    mockConfigure.mockResolvedValue(undefined);
    const mockFactor = {
      sid: 'YF1234567890',
      friendlyName: 'Test Device',
      accountSid: 'AC1234567890',
      serviceSid: 'VA1234567890',
      identity: 'user-identity',
      status: 'unverified',
      type: 'push',
      createdAt: '2024-01-01T00:00:00Z',
    };
    mockCreateFactor.mockResolvedValue(mockFactor);

    await TwilioVerify.configure({
      keychainQueryMode: KeychainQueryMode.Strict,
    });
    const factor = await TwilioVerify.createFactor(
      new PushFactorPayload(
        'Test Device',
        'VA1234567890',
        'user-identity',
        'access-token',
        'push-token'
      )
    );

    expect(mockConfigure).toHaveBeenCalledTimes(1);
    expect(mockCreateFactor).toHaveBeenCalledTimes(1);
    expect(factor.sid).toBe('YF1234567890');
  });

  it('should reject configure after SDK has been used', async () => {
    mockCreateFactor.mockResolvedValue({
      sid: 'YF1234567890',
      status: 'unverified',
    });
    mockConfigure.mockRejectedValue(
      new Error(
        'TwilioVerify SDK has already been initialized. configure() must be called before any other SDK method.'
      )
    );

    await TwilioVerify.createFactor(
      new PushFactorPayload(
        'Test Device',
        'VA1234567890',
        'user-identity',
        'access-token',
        'push-token'
      )
    );

    await expect(
      TwilioVerify.configure({ keychainQueryMode: KeychainQueryMode.Strict })
    ).rejects.toThrow('already been initialized');
  });
});

describe('exports', () => {
  it('should export KeychainQueryMode from index', () => {
    const exports = require('../index');
    expect(exports.KeychainQueryMode).toBeDefined();
    expect(exports.KeychainQueryMode.Strict).toBe('strict');
    expect(exports.KeychainQueryMode.Legacy).toBe('legacy');
  });
});
