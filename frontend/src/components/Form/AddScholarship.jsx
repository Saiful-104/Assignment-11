import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import ErrorPage from '../../pages/ErrorPage';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../Shared/Container';
import Heading from '../Shared/Heading';

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post('/scholarships', payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Scholarship added successfully');
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to add scholarship');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const image = watch("image");

  const onSubmit = async (data) => {
    const {
      scholarshipName,
      universityName,
      universityCountry,
      universityCity,
      universityWorldRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline,
      scholarshipPostDate,
      image,
    } = data;

    try {
      // Upload image if provided
      let imageUrl = '';
      if (image && image[0]) {
        imageUrl = await imageUpload(image[0]);
      }

      const scholarshipData = {
        scholarshipName,
        universityName,
        universityImage: imageUrl,
        universityCountry,
        universityCity,
        universityWorldRank: Number(universityWorldRank) || 0,
        subjectCategory,
        scholarshipCategory,
        degree,
        tuitionFees: tuitionFees ? Number(tuitionFees) : 0,
        applicationFees: Number(applicationFees),
        serviceCharge: serviceCharge ? Number(serviceCharge) : 0,
        applicationDeadline,
        scholarshipPostDate: scholarshipPostDate || new Date().toISOString(),
        postedUserEmail: user?.email,
      };

      await mutateAsync(scholarshipData);
      reset();
    } catch (err) {
      console.log(err);
      toast.error('Error adding scholarship');
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const scholarshipCategories = ['Full fund', 'Partial', 'Self-fund'];
  const degreeOptions = ['Diploma', 'Bachelor', 'Masters', 'PhD'];

  return (
    <Container>
      <Heading title="Add New Scholarship" />
      
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Scholarship Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="scholarshipName" className="block text-gray-600">
                  Scholarship Name *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="scholarshipName"
                  type="text"
                  placeholder="Scholarship Name"
                  {...register('scholarshipName', {
                    required: 'Scholarship name is required',
                  })}
                />
                {errors.scholarshipName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.scholarshipName.message}
                  </p>
                )}
              </div>

              {/* University Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="universityName" className="block text-gray-600">
                  University Name *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="universityName"
                  type="text"
                  placeholder="University Name"
                  {...register('universityName', {
                    required: 'University name is required',
                  })}
                />
                {errors.universityName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.universityName.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-1 text-sm">
                <label htmlFor="universityCountry" className="block text-gray-600">
                  Country *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="universityCountry"
                  type="text"
                  placeholder="Country"
                  {...register('universityCountry', {
                    required: 'Country is required',
                  })}
                />
                {errors.universityCountry && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.universityCountry.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1 text-sm">
                <label htmlFor="universityCity" className="block text-gray-600">
                  City
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="universityCity"
                  type="text"
                  placeholder="City"
                  {...register('universityCity')}
                />
              </div>

              {/* World Rank */}
              <div className="space-y-1 text-sm">
                <label htmlFor="universityWorldRank" className="block text-gray-600">
                  World Rank
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="universityWorldRank"
                  type="number"
                  placeholder="World Rank"
                  {...register('universityWorldRank')}
                />
              </div>

              {/* Subject Category */}
              <div className="space-y-1 text-sm">
                <label htmlFor="subjectCategory" className="block text-gray-600">
                  Subject Category *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="subjectCategory"
                  type="text"
                  placeholder="e.g., Computer Science, Business"
                  {...register('subjectCategory', {
                    required: 'Subject category is required',
                  })}
                />
                {errors.subjectCategory && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.subjectCategory.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Scholarship Category */}
              <div className="space-y-1 text-sm">
                <label htmlFor="scholarshipCategory" className="block text-gray-600">
                  Scholarship Category *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="scholarshipCategory"
                  {...register('scholarshipCategory', {
                    required: 'Scholarship category is required',
                  })}
                >
                  {scholarshipCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.scholarshipCategory && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.scholarshipCategory.message}
                  </p>
                )}
              </div>

              {/* Degree */}
              <div className="space-y-1 text-sm">
                <label htmlFor="degree" className="block text-gray-600">
                  Degree *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="degree"
                  {...register('degree', {
                    required: 'Degree is required',
                  })}
                >
                  {degreeOptions.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                {errors.degree && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.degree.message}
                  </p>
                )}
              </div>

              {/* Tuition Fees (optional) */}
              <div className="space-y-1 text-sm">
                <label htmlFor="tuitionFees" className="block text-gray-600">
                  Tuition Fees (optional)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="tuitionFees"
                  type="number"
                  placeholder="Tuition Fees"
                  {...register('tuitionFees')}
                />
              </div>

              {/* Application Fees */}
              <div className="space-y-1 text-sm">
                <label htmlFor="applicationFees" className="block text-gray-600">
                  Application Fees *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="applicationFees"
                  type="number"
                  placeholder="Application Fees"
                  {...register('applicationFees', {
                    required: 'Application fees is required',
                    min: { value: 0, message: 'Fees must be positive' },
                  })}
                />
                {errors.applicationFees && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.applicationFees.message}
                  </p>
                )}
              </div>

              {/* Service Charge */}
              <div className="space-y-1 text-sm">
                <label htmlFor="serviceCharge" className="block text-gray-600">
                  Service Charge
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="serviceCharge"
                  type="number"
                  placeholder="Service Charge"
                  {...register('serviceCharge')}
                />
              </div>

              {/* Application Deadline */}
              <div className="space-y-1 text-sm">
                <label htmlFor="applicationDeadline" className="block text-gray-600">
                  Application Deadline *
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="applicationDeadline"
                  type="date"
                  {...register('applicationDeadline', {
                    required: 'Application deadline is required',
                  })}
                />
                {errors.applicationDeadline && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.applicationDeadline.message}
                  </p>
                )}
              </div>

              {/* Scholarship Post Date */}
              <div className="space-y-1 text-sm">
                <label htmlFor="scholarshipPostDate" className="block text-gray-600">
                  Scholarship Post Date
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-blue-500 rounded-md bg-white"
                  id="scholarshipPostDate"
                  type="date"
                  {...register('scholarshipPostDate')}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1 text-sm">
                <div className="p-4 w-full m-auto rounded-lg">
                  <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                    <div className="flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          id="image"
                          accept="image/*"
                          hidden
                          {...register('image')}
                        />
                        <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-600">
                          Upload University Image
                        </div>
                      </label>
                      {
                        image && image.length>0 && (
                             <p className="mt-2 text-green-600 font-medium">
            ✅ Image selected successfully
          </p>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  'Add Scholarship'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddScholarship;