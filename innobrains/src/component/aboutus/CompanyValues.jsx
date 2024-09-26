import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CompanyValues = () => {
  return (
    <div className='bg-[#F6F6F6]'>
        <div className=" py-12 text-center">
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-4">
        Emphasize what's important to your company
      </h2>
      <p className="text-gray-600 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
      </p>

      {/* Values Container */}
      <div className="flex justify-center gap-8">
        {/* Value 1 */}
        <div className="max-w-xs text-center">
          <div className="mb-4">
          <FontAwesomeIcon icon={faUsers} className='text-3xl text-[#103153]'></FontAwesomeIcon>
          </div>
          <h3 className="text-xl font-semibold mb-2">Highlight value one</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>
        </div>

        {/* Value 2 */}
        <div className="max-w-xs text-center">
          <div className="mb-4">
          <FontAwesomeIcon icon={faUserCircle} className='text-3xl text-[#103153]'></FontAwesomeIcon>
          </div>
          <h3 className="text-xl font-semibold mb-2">Highlight value two</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>
        </div>

        {/* Value 3 */}
        <div className="max-w-xs text-center">
          <div className="mb-4">
           <FontAwesomeIcon icon={faCodepen} className='text-3xl text-[#103153]'></FontAwesomeIcon>
          </div>
          <h3 className="text-xl font-semibold mb-2">Highlight value three</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CompanyValues;
