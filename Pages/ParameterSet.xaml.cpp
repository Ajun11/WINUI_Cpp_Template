#include "pch.h"
#include "ParameterSet.xaml.h"
#include <winrt/Windows.UI.Xaml.Interop.h>
//* Animation header
#include <winrt/Microsoft.UI.Xaml.Media.Animation.h>
#if __has_include("ParameterSet.g.cpp")
#include "ParameterSet.g.cpp"
#endif

using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
	//* 加载可视化树前进入该函数，用于判断导航前一页
	void ParameterSet::OnNavigatedTo(Microsoft::UI::Xaml::Navigation::NavigationEventArgs const& e)
	{
		prepagename = unbox_value<hstring>(e.Parameter().as<IInspectable>());
		if (prepagename == L"Page1")
		{
			BackwardButtonText().Text(L"Back to home");
		}
		else if(prepagename == L"Page2")
		{
			BackwardButtonText().Text(L"Back to last page");
		}
	}
	void ParameterSet::BackwardButton_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
	{
		Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo slideEffect = Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
		slideEffect.Effect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromLeft));
		if (prepagename == L"Page1")
		{
			this->Frame().Navigate(xaml_typename<winrt::ControlSystem::Page1>(), nullptr, slideEffect);
		}
		else if(prepagename == L"Page2"){
			this->Frame().Navigate(xaml_typename<winrt::ControlSystem::Page2>(), nullptr, slideEffect);
		}
	}
}