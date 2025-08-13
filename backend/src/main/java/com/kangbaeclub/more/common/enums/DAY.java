package com.kangbaeclub.more.common.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DAY {
    MONDAY("월요일"),
    TUESDAY("화요일"),
    WEDNESDAY("수요일"),
    THURSDAY("목요일"),
    FRIDAY("금요일"),
    SATURDAY("토요일"),
    SUNDAY("일요일");

    private final String value;

    DAY(String value) {
        this.value = value;
    }

    // 직렬화시, `value` 값을 가져오도록
    @JsonValue
    public String getValue() {
        return this.value;
    }
}
