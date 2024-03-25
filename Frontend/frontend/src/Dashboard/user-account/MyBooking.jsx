import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../../config';
import DoctorCard from '../../components/doctors/DoctorCard';
import Loading from '../../components/loader/Loading';
import Error from '../../components/Error/Error';

const MyBooking = () => {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointment/my-appointments`);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error errorMessage={error} />;
    }

    if (!appointments || appointments.length === 0) {
        return (
            <div>
                <h2 className="mt-5 leading-7 text-[20px] font-semibold text-primaryColor">
                    You did not book any doctor Appointment yet !
                </h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {appointments.map(doctor => (
                <DoctorCard doctor={doctor} key={doctor._id} />
            ))}
        </div>
    );
};

export default MyBooking;
