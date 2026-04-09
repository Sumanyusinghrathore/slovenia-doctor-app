import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import CustomHeader from '../../../components/Header/CustomHeader';

const BlogDetails = () => {
  return (
    <View style={[genericStyles.container]}>
      {/* <CustomHeader title="Blog " /> */}
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Page Heading */}
          <Label
            size={24}
            labelContent="Improving Daily Care Coordination"
            align="left"
            mb={12}
          />

          {/* Banner Image */}
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dcc9mvpxh/image/upload/v1752821081/mypnchhzdb6gfponb3nr.png',
            }}
            style={styles.banner}
            resizeMode="cover"
          />

          {/* Date */}
          <Label size={12} labelContent="7/18/2025" mt={12} mb={16} />

          {/* Intro Section */}
          <Label
            size={14}
            labelContent="A connected staff workflow helps patients get faster, safer, and more consistent care."
            mb={10}
          />

          <Label
            size={13}
            labelContent="When admin, doctor, and compounder teams use the same workflow, requests move faster, prescriptions stay traceable, and assigned visits become much easier to manage."
            mb={16}
          />

          {/* Why Choose Section */}
          <Label size={15} labelContent="Why This Workflow Helps" mb={10} />

          <Label
            size={14}
            labelContent="Centralized Staff Access"
            mb={4}
          />
          <Label
            size={13}
            labelContent="Admin, doctor, and compounder roles can each access only the actions they need, which reduces confusion and keeps the workflow structured."
            mb={8}
          />

          <Label size={14} labelContent="Clear Request Handling" mb={4} />
          <Label
            size={13}
            labelContent="Patient requests can be reviewed, accepted, or rejected in one place so doctors can act quickly on incoming cases."
            mb={8}
          />

          <Label size={14} labelContent="Prescription Tracking" mb={4} />
          <Label
            size={13}
            labelContent="Doctors can create prescriptions and revisit patient history whenever follow-up care is needed."
            mb={8}
          />

          <Label size={14} labelContent="Home Visit Visibility" mb={4} />
          <Label
            size={13}
            labelContent="Assigned compounders can see scheduled visits, patient details, and status updates without manual coordination."
            mb={8}
          />

          <Label
            size={14}
            labelContent="Reliable Health Check Records"
            mb={4}
          />
          <Label
            size={13}
            labelContent="Vitals and visit notes can be stored consistently so the care team has one reliable record of the patient’s latest condition."
            mb={8}
          />

          <Label size={14} labelContent="Role-Based Accountability" mb={4} />
          <Label
            size={13}
            labelContent="Each staff member sees the work assigned to their role, making ownership clear and reducing duplicate actions."
            mb={8}
          />

          <Label size={14} labelContent="Operational Simplicity" mb={4} />
          <Label
            size={13}
            labelContent="A single login system with JWT-based roles keeps authentication simple while still protecting role-specific routes."
            mb={8}
          />

          <Label size={14} labelContent="Analytics That Matter" mb={4} />
          <Label
            size={13}
            labelContent="Dashboard counts and monthly activity make it easier to monitor workload, staffing, and overall service delivery."
            mb={16}
          />

          {/* Featured Areas */}
          <Label size={15} labelContent="Key Operational Areas" mb={10} />

          <Label
            size={14}
            labelContent="1. Admin Operations"
            mb={4}
          />
          <Label size={13} labelContent="Users: Admin" />
          <Label size={13} labelContent="Focus: doctors, patients, services, categories" />
          <Label size={13} labelContent="Outcome: consistent master setup" mb={4} />
          <Label
            size={13}
            labelContent="Admins handle onboarding and core data so the rest of the staff can focus on treatment and field work."
            mb={10}
          />

          <Label size={14} labelContent="2. Doctor Workflow" mb={4} />
          <Label size={13} labelContent="Users: Doctor" />
          <Label size={13} labelContent="Focus: requests, prescriptions, home visits" />
          <Label size={13} labelContent="Outcome: timely care decisions" mb={4} />
          <Label
            size={13}
            labelContent="Doctors review cases, respond to requests, prescribe treatment, and assign visits when on-ground follow-up is needed."
            mb={10}
          />

          <Label
            size={14}
            labelContent="3. Compounder Workflow"
            mb={4}
          />
          <Label size={13} labelContent="Users: Compounder" />
          <Label size={13} labelContent="Focus: assigned visits and health checks" />
          <Label size={13} labelContent="Outcome: faster field reporting" mb={4} />
          <Label
            size={13}
            labelContent="Compounders can complete home visits, capture vitals, and submit notes so doctors have updated patient information."
            mb={16}
          />

          {/* Closing */}
          <Label
            size={14}
            labelContent="Better Coordination, Better Care"
            mb={6}
          />
          <Label
            size={13}
            labelContent="A role-based staff app keeps the full chain connected from admin setup to doctor review to compounder field updates."
            mb={24}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 0,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});
