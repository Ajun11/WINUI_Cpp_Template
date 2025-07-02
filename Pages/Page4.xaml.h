#pragma once

#include "Page4.g.h"

namespace winrt::ControlSystem::implementation
{
	struct Page4 : Page4T<Page4>
	{
		Page4();
	};
}

namespace winrt::ControlSystem::factory_implementation
{
	struct Page4 : Page4T<Page4, implementation::Page4>
	{
	};
}
