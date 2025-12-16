import { useState } from 'react';
import { Address } from '@/context/address/AddressContext';

type Props = {
  initialAddress: Address;
  onSave: (address: Address) => void;
  onClose: () => void;
};

export default function ChangeAddressModal({
  initialAddress,
  onSave,
  onClose,
}: Props) {
  const [street, setStreet] = useState(initialAddress.street);
  const [phone, setPhone] = useState(initialAddress.phone);

  const handleSave = () => {
    onSave({ street, phone });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-xl w-full max-w-md p-6'>
        <h3 className='text-lg font-semibold mb-4'>Change Delivery Address</h3>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Address</label>
            <textarea
              className='w-full border rounded-lg p-2 text-sm mt-1'
              rows={3}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Phone Number</label>
            <input
              type='text'
              className='w-full border rounded-lg p-2 text-sm mt-1'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button
            className='px-4 py-2 text-sm border rounded-lg'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 text-sm bg-red-600 text-white rounded-lg'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
