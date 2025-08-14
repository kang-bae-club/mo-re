package com.kangbaeclub.more.common;

import com.kangbaeclub.more.meeting.entity.Room;
import com.kangbaeclub.more.meeting.entity.RoomId;
import com.kangbaeclub.more.member.entity.Department;
import com.kangbaeclub.more.member.entity.DepartmentId;
import com.kangbaeclub.more.member.entity.Member;
import com.kangbaeclub.more.member.entity.MemberId;
import com.kangbaeclub.more.organization.entity.Organization;

/**
 * Test fixture factory to provide pre-configured entities for tests.
 * This reduces code duplication across entity tests.
 */
public class TestFixtureFactory {

    // Default test data constants
    public static final String DEFAULT_ORG_NAME = "Test Organization";
    public static final String DEFAULT_ORG_PICTURE_URL = "test-url";
    public static final Long DEFAULT_DEPT_ID = 1L;
    public static final String DEFAULT_DEPT_NAME = "Test Department";
    public static final String DEFAULT_MEMBER_ID = "testuser";
    public static final String DEFAULT_MEMBER_NAME = "Test User";
    public static final String DEFAULT_USERNAME = "testusername";
    public static final String DEFAULT_ROOM_NAME = "Test Room";
    public static final int DEFAULT_ROOM_CAPACITY = 20;

    /**
     * Creates a default Organization entity for testing.
     */
    public static Organization createOrganization() {
        return Organization.builder()
                .organizationName(DEFAULT_ORG_NAME)
                .organizationPictureUrl(DEFAULT_ORG_PICTURE_URL)
                .build();
    }

    /**
     * Creates an Organization entity with custom values.
     */
    public static Organization createOrganization(String name, String pictureUrl) {
        return Organization.builder()
                .organizationName(name)
                .organizationPictureUrl(pictureUrl)
                .build();
    }

    /**
     * Creates a default Department entity for testing.
     * Note: The organizationId will be set when the department is associated with an organization.
     */
    public static Department createDepartment(Organization organization) {
        DepartmentId departmentId = DepartmentId.builder()
                .deptId(DEFAULT_DEPT_ID)
                .organizationId(organization.getOrganizationId())
                .build();
        
        return Department.builder()
                .departmentId(departmentId)
                .organization(organization)
                .deptName(DEFAULT_DEPT_NAME)
                .build();
    }

    /**
     * Creates a Department entity with custom values.
     */
    public static Department createDepartment(Organization organization, Long deptId, String deptName) {
        DepartmentId departmentId = DepartmentId.builder()
                .deptId(deptId)
                .organizationId(organization.getOrganizationId())
                .build();
        
        return Department.builder()
                .departmentId(departmentId)
                .organization(organization)
                .deptName(deptName)
                .build();
    }

    /**
     * Creates a default Member entity for testing.
     */
    public static Member createMember(Department department) {
        MemberId memberId = MemberId.builder()
                .memberId(DEFAULT_MEMBER_ID)
                .departmentId(department.getDepartmentId())
                .build();
        
        return Member.builder()
                .id(memberId)
                .department(department)
                .name(DEFAULT_MEMBER_NAME)
                .username(DEFAULT_USERNAME)
                .build();
    }

    /**
     * Creates a Member entity with custom values.
     */
    public static Member createMember(Department department, String memberId, String name, String username) {
        MemberId memberIdObj = MemberId.builder()
                .memberId(memberId)
                .departmentId(department.getDepartmentId())
                .build();
        
        return Member.builder()
                .id(memberIdObj)
                .department(department)
                .name(name)
                .username(username)
                .build();
    }

    /**
     * Creates a default Room entity for testing.
     */
    public static Room createRoom(Organization organization) {
        RoomId roomId = RoomId.builder()
                .organizationId(organization.getOrganizationId())
                .name(DEFAULT_ROOM_NAME)
                .build();
        
        return Room.builder()
                .roomId(roomId)
                .organization(organization)
                .capacity(DEFAULT_ROOM_CAPACITY)
                .build();
    }

    /**
     * Creates a Room entity with custom values.
     */
    public static Room createRoom(Organization organization, String roomName, int capacity) {
        RoomId roomId = RoomId.builder()
                .organizationId(organization.getOrganizationId())
                .name(roomName)
                .build();
        
        return Room.builder()
                .roomId(roomId)
                .organization(organization)
                .capacity(capacity)
                .build();
    }
}