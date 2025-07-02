#include "pch.h"

#include "Simulation.h"
winrt::hstring PackVectorMessage(const std::vector<float>& nums)
{
    std::string result;
    result.reserve(nums.size() * 8);  // 预分配空间
    const char hex[] = "0123456789abcdef";
    for (const float& num : nums) 
    {
        unsigned int val= *(reinterpret_cast<const unsigned int*>(&num));
        char buf[8];
        // 手动转换十六进制
        for (int i = 7; i >= 0; --i) {
            buf[i] = hex[val & 0xF];
            val >>= 4;
        }
        result.append(buf, 8);
    }
    winrt::hstring return_hstring = L"UpdateAllFig(\"" + winrt::to_hstring(result) + L"\")";
    return return_hstring;
}
winrt::hstring PackImportantMessage(const float& simulation_interval)
{
   
    std::string important_msg;
    important_msg.reserve(2 * 8);
    const char hex[] = "0123456789abcdef";
    char buf[8];
    unsigned int val;
    val = *(reinterpret_cast<const unsigned int*>(&simulation_interval));
    for (int i = 7; i >= 0; --i) {
        buf[i] = hex[val & 0xF];
        val >>= 4;
    }
    important_msg.append(buf, 8);
    //* important msg: interval
    winrt::hstring important_msg_hs = L"GetCMGImportantMsgFromWINUIApp(\"" + winrt::to_hstring(important_msg) + L"\")";
    return important_msg_hs;
}

